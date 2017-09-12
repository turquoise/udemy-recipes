import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

//import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  // we want to know if we are editing a recipe or creating a new recipe.
  editMode = false;
  // tells angular this is a reactive form.
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router ) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          // + converts the params into a number.
          this.id = +params['id'];
          // check if params has an id?
          // if it is not equal to null and it returns true
          this.editMode = params['id'] != null;
          // checking to see if it works.
          //console.log(this.editMode);
          this.initForm();
        }
      );
  }

  onSubmit() {
  //   const newRecipe = new Recipe(
  //     this.recipeForm.value['name'],
  //     this.recipeForm.value['description'],
  //     this.recipeForm.value['imagePath'],
  //     this.recipeForm.value['ingredients']
  // );
    //console.log(this.recipeForm);
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value );
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients ) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required ),
              'amount': new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          );
        }
      }
    }
    // the FormGroup has key value pairs for the FormControls you want to register.
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required ),
      'description': new FormControl(recipeDescription, Validators.required ),
      'ingredients': recipeIngredients
    });

  }

}

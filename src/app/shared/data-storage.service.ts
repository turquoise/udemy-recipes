import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { RecipeService } from '../recipes/recipe.service';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { AuthService } from '../auth/auth.service';

import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from './ingredient.model';

@Injectable()
export class DataStorageService {

  constructor(private http: Http,
              private recipeService: RecipeService,
              private shoppingListService: ShoppingListService,
              private authService: AuthService ) {}

  storeRecipes() {
    const token = this.authService.getToken();

    return this.http.put('https://udemy-angular4.firebaseio.com/recipes.json?auth=' + token,
                        this.recipeService.getRecipes());
  }

  storeShoppingList() {
    const token = this.authService.getToken();

    return this.http.put('https://udemy-angular4.firebaseio.com/shoppinglist.json?auth=' + token,
                        this.shoppingListService.getIngredients());
  }



  getRecipes() {
    const token = this.authService.getToken();

    this.http.get('https://udemy-angular4.firebaseio.com/recipes.json?auth=' + token)
    .map(
      (response: Response) => {
        const recipes: Recipe[] = response.json();
        for (let recipe of recipes) {
          //console.log(recipe);
          if (!recipe['ingredients']) {
            recipe['ingredients'] = [];
          }
        }
        return recipes;
      }
    )
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }
      );
  }

  getShoppingList() {
    const token = this.authService.getToken();

    this.http.get('https://udemy-angular4.firebaseio.com/shoppinglist.json?auth=' + token)
    .map(
      (response: Response) => {
        const ingredients: Ingredient[] = response.json();
        for (let ingredient of ingredients) {
          console.log(ingredient);

        }
        return ingredients;
      }
    )
      .subscribe(
        (ingredients: Ingredient[]) => {
          this.shoppingListService.setIngredients(ingredients);
        }
      );
  }


}

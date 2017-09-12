import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {


  recipes: Recipe[];
  subscription: Subscription;

  constructor(private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute ) { }

  ngOnInit() {
    // we want to listen to this event or Subject and subscribe to it.
    this.subscription = this.recipeService.recipesChanged
      .subscribe(
        // if it did change wil recieve a new array.
        (recipes: Recipe[]) => {
          // set the recipes to the recipes that got passed back.
          this.recipes = recipes;
        }
      );
    this.recipes = this.recipeService.getRecipes();
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}

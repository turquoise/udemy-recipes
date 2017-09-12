import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class RecipeService {

  recipesChanged = new Subject<Recipe[]>();


  private recipes: Recipe[] = [
    new Recipe(
      'Spaghetti Bolognaise', 'Classic pasta sauce.',
      'https://upload.wikimedia.org/wikipedia/commons/0/0c/Penne_Bolognaise_Pasta.JPG',
      [
        new Ingredient('Minced meat', 1),
        new Ingredient('Onions', 3),
        new Ingredient('red wine', 1),
        new Ingredient('garlic', 1),
        new Ingredient('chopped tomatoes', 1)
      ]
    ),
    new Recipe(
      'Marinated Grilled Chicken', 'Spicy marinade recipe.',
      'https://addapinch.com/wp-content/blogs.dir/3/files/2013/01/beer-marinated-chicken-DSC_1942.jpg',
      [
        new Ingredient('Olive oil', 0.5),
        new Ingredient('Sea salt', 1),
        new Ingredient('Black pepper', 1),
        new Ingredient('Paprika', 1),
        new Ingredient('Cumin', 1),
        new Ingredient('Cayenne pepper', 1),
        new Ingredient('Chopped onion', 1),
        new Ingredient('beer', 1)
      ]
    ),
    new Recipe(
      'Teriyaki Salmon', 'Easy Teriyaki sauce.',
      'https://healthyrecipesblogs.com/wp-content/uploads/2014/07/teriyaki-salmon1.jpg',
      [
        new Ingredient('Sesame oil', 0.5),
        new Ingredient('Salmon fillets', 4),
        new Ingredient('garlic', 1),
        new Ingredient('Ginger', 1),
        new Ingredient('Soy Sauce', 1),
        new Ingredient('Brown sugar', 1),
        new Ingredient('Cornstarch', 1),
        new Ingredient('Sessame seeds', 1)
      ]
    ),
    new Recipe(
      "Nando's style peri-peri chicken", 'Spicy marinade recipe.',
      'http://3.bp.blogspot.com/_yPn45KkKQ-k/TTOifbbYQSI/AAAAAAAAGjU/DM79b5w-yP4/s1600/DSC_0232%2Bresized.jpg',
      [
        new Ingredient('Chicken breasts', 4),
        new Ingredient('Paprika', 1),
        new Ingredient('Onion', 1),
        new Ingredient('Salt', 1),
        new Ingredient('Black pepper', 1),
        new Ingredient('Honey', 1),
        new Ingredient('Parsley', 1),
        new Ingredient('Coriander', 1),
        new Ingredient('Oregano', 1),
        new Ingredient('Chilli pepper', 1),
        new Ingredient('Cayenne pepper', 1),
        new Ingredient('Cumin', 1)
      ]
    ),
    new Recipe(
      'Parma ham wrapped cod', 'Fish with a difference.',
      'http://goodtoknow.media.ipcdigital.co.uk/111/000007770/a8f0_orh412w625/ParmaHamWrappedCod.jpg',
      [
        new Ingredient('Cod fillets', 4),
        new Ingredient('Rosemary', 1),
        new Ingredient('Lemon zest', 1),
        new Ingredient('Parma ham', 8),
        new Ingredient('Black pepper', 1)

      ]
    )


  ];

  constructor(private shoppingListService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    // returns a copy of the array.
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    // slice gives you a copy of your array.
    //return this.recipes.slice()[index];
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    // emit the event and add a new value of the list of recipes ( an new slice )
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());

  }



}

import { Subject } from 'rxjs/Subject';
import { Recipe } from './recipe.model';
import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';

@Injectable()

export class RecipeService {
recepeSelected = new EventEmitter<Recipe>();
recipeChanged = new Subject<Recipe[]>();
   private recipes: Recipe[] = [
    new Recipe('Alferado', 'Tasty Alferdo', 'http://img.sndimg.com/food/image/upload/v1/img/recipes/39/08/7/piccZDaro.jpg', [
      new Ingredient('Pasta', 25),
      new Ingredient('French Fries', 30)
    ]),
    new Recipe('Cheese Burger', 'Awsome Burger !', 'https://i.ytimg.com/vi/a40xP-CvBAw/maxresdefault.jpg', [
      new Ingredient('Burger Meat', 3),
      new Ingredient('Buns', 2)
    ])
  ];

  constructor(private slService: ShoppingListService) {


  }
  getRecipe() {
   return this.recipes.slice(); // to create a new copy of the array of recipes so that when we change
   // it not changed the recipe array in recipe service
  }
  getRecipeIndex(index: number) {
    return this.recipes[index];
  }
  addIngredientToSl(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }
  updateRecipe(index: number , newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());

  }
  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }
}

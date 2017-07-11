import { Recipe } from "app/recipes/recipe.model";

export class RecipeService {
   private recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is simply a test', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg'),
    new Recipe('Another Test Recipe', 'This is simply a test', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg')
  ];
  getRecipe(){
   return this.recipes.slice(); // to create a new copy of the array of recipes so that when we change
   // it not changed the recipe array in recipe service
  }
}
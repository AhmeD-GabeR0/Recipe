import { Ingredient } from './../shared/ingredient.model';
import { EventEmitter } from '@angular/core';
import {Subject} from 'rxjs/Subject';

export class ShoppingListService {
  IngredientChanged = new EventEmitter<Ingredient[]>();
  startedEditing = new Subject<number>();
   private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];
  getIngredient() {
   return this.ingredients.slice();
  }
  getIngredientIndex(index: number) {
    return this.ingredients[index];
  }
  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.IngredientChanged.emit(this.ingredients.slice());
  }
  addIngredients(ingredient: Ingredient[]) {
    this.ingredients.push(...ingredient);
    this.IngredientChanged.emit(this.ingredients.slice());

  }
  updateIngredients(index: number , newIngredients: Ingredient) {
    this.ingredients[index] = newIngredients;
    this.IngredientChanged.emit(this.ingredients.slice());
  }
}

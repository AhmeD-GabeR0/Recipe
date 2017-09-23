import { ShoppingListComponent } from './../shopping-list.component';
import { Ingredient } from './../../shared/ingredient.model';
import { Subscription } from 'rxjs/Subscription';
import {
  Component,
  OnInit,
OnDestroy,
ViewChild
} from '@angular/core';

import { ShoppingListService } from '../shopping-list.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit , OnDestroy {
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editItemIndex: number;
  editedItem: Ingredient;
  constructor(private slService: ShoppingListService) { }
  ngOnInit() {
   this.subscription = this.slService.startedEditing.subscribe(
     (index: number) => {
      this.editMode = true;
      this.editItemIndex = index;
      this.editedItem = this.slService.getIngredientIndex(index);
      this.slForm.setValue({
        name: this.editedItem.name ,
        amount: this.editedItem.amount
      });
     }
   );
  }

  onSubmint(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name , value.amount);
    if (this.editMode) {
      this.slService.updateIngredients(this.editItemIndex , newIngredient);
    } else {
    this.slService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }
  onClear() {
    this.slForm.reset();
    this.editMode = false;

  }
  onDelete() {
    this.slService.deleteIngredients(this.editItemIndex);
    this.onClear();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

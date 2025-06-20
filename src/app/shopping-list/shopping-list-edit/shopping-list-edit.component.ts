import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';


import { Ingredient } from '../../shared/ingredient.model'; 
import { ShoppingListService } from '../shopping-list.service';


@Component({
  selector: 'app-shopping-list-edit',
  standalone: false,
  templateUrl: './shopping-list-edit.component.html',
  styleUrl: './shopping-list-edit.component.css'
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  
  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.slService.startedEditing
        .subscribe(
          (index: number) => {
            this.editedItemIndex = index;
            this.editMode = true;
            this.editedItem = this.slService.getIngredient(index);
            this.slForm.setValue({
              name: this.editedItem.name,
              amount: this.editedItem.amount
            })
          }
        );
  }
 onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.slService.updateIngredient(this.editedItemIndex, newIngredient);
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
  this.slService.deleteIngredient(this.editedItemIndex);
  this.onClear();
 }



 ngOnDestroy() {
   this.subscription.unsubscribe();
   // Unsubscribe to prevent memory leaks when the component is destroyed
 }
}

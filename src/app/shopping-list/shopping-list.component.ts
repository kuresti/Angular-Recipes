import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  standalone: false,
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent  implements OnInit, OnDestroy {
  // The ShoppingListComponent is responsible for displaying the shopping list and managing its ingredients.
  ingredients: Ingredient[];
  private igChangedSub: Subscription;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.slService.getIngredients();
    this.igChangedSub = this.slService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      });
    }

    onEditItem(index: number) {
      this.slService.startedEditing.next(index);
      // This method emits an event to notify that an item is being edited, passing the index of the item.
    }

     ngOnDestroy() {
    this.igChangedSub.unsubscribe();
    // Unsubscribe to prevent memory leaks when the component is destroyed  
     }
    
  }

 


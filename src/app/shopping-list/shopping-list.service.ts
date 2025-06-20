
import { Subject } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';


export class ShoppingListService {
    ingredientsChanged = new Subject<Ingredient[]>();
    // The Subject class is a special type of Observable that allows you to emit values to subscribers
    startedEditing = new Subject<number>();

   private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
    ];

    getIngredients() {
        return this.ingredients.slice(); // return a copy of the ingredients array
    } 

    getIngredient(index: number) {
        if (index < 0 || index >= this.ingredients.length) {
            return null;
        }
        return this.ingredients[index]; // return the ingredient at the specified index
    }
    
    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice()); // emit the updated ingredients array
    }
    
    addIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice()); // emit the updated ingredients array
    }

    updateIngredient(index: number, newIngredient: Ingredient) {
        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    deleteIngredient(index: number) {
        this.ingredients.splice(index, 1);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
}
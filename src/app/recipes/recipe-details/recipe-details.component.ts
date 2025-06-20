import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-details',
  standalone: false,
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.css'
})
export class RecipeDetailsComponent implements OnInit {
  recipe: Recipe;
  id: number;
  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router
  ) { }

  ngOnInit() {
      this.route.params
        .subscribe(
          (params: Params) => {
            this.id = +params['id']; // Get the recipe ID from the route parameters
            this.recipe = this.recipeService.getRecipe(this.id); // Fetch the recipe by ID

          }
        );
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }
  
  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
    // This method navigates to the 'edit' route relative to the current route, allowing users to edit the recipe.
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

}

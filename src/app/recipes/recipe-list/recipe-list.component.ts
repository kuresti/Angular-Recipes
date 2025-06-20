import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-recipe-list',
  standalone: false,
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent implements OnInit, OnDestroy {
 recipes: Recipe[];
 subscription: Subscription;
 
 constructor(private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute) {
  // The constructor initializes the RecipeService, Router, and ActivatedRoute services.  
 }

  ngOnInit() {
    this.subscription = this.recipeService.recipesChanged
        .subscribe(
           (recipes: Recipe[]) => {
            this.recipes = recipes;
           }
        )
    this.recipes = this.recipeService.getRecipes();
  }
  
  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
    // This method navigates to the 'new' route relative to the current route, allowing users to create a new recipe.
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  

}

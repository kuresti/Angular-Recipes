import { Component, OnInit } from '@angular/core';


import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  standalone: false,
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css',
  providers: [RecipeService]
  // providers: [RecipeService] // This is the same as adding it to the module providers array
})
export class RecipesComponent implements OnInit {
 

  constructor() {}

  ngOnInit() {}
}

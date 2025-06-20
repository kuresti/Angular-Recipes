import { Component, OnInit, Input } from '@angular/core';

import { Recipe } from '../../recipe.model';


@Component({
  selector: 'app-recipe-item',
  standalone: false,
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css'
})
export class RecipeItemComponent {
  @Input() recipe: Recipe;
  @Input() index: number;
  // The @Input() decorator allows this component to receive data from its parent component
  ngOnInit() {

  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, 
         FormControl,
         FormArray, 
         Validators } from '@angular/forms';

import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  standalone: false,
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css'
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  // The editMode variable is not used in this component, but it can be useful for determining if the component is in edit mode or not.
// It can be set to true if the component is being used to edit an existing recipe, or false if it is being used to create a new recipe.
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router ) { }

  ngOnInit() {
    this.route.params.
      subscribe(
        (params)=> {
          this.id = +params['id']; // Get the recipe ID from the route parameters
          this.editMode = params['id'] != null; // Check if the ID is present to determine edit mode
          // If the ID is not null, it means we are in edit mode, otherwise we are in create mode
          this.initForm();
        }
      );
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    )
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  
  onSubmit() {
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          );
        }
      }
    }
    this.recipeForm = new FormGroup ({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  get controls() {
    return(<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }


}

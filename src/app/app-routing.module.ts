import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";
import { RecipeDetailsComponent } from "./recipes/recipe-details/recipe-details.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { Recipe } from "./recipes/recipe.model";

const appRoutes: Routes =[
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    // Redirect to recipes if the path is empty
    { path: 'recipes', component: RecipesComponent, children: [
        { path: '', component: RecipeStartComponent }, // Default route for recipes
        { path: 'new', component: RecipeEditComponent }, // Route for creating a new recipe
        { path: ':id', component: RecipeDetailsComponent }, // Dynamic route for recipe details        
        { path: ':id/edit', component: RecipeEditComponent } // Route for editing an existing recipe
    ] },
    { path: 'shopping-list', component: ShoppingListComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
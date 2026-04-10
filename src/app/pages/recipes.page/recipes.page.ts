import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe.model';
import { RecipeCards } from '../../components/recipe-cards/recipe-cards';

@Component({
  selector: 'app-recipes.page',
  imports: [RecipeCards],
  templateUrl: './recipes.page.html',
  styleUrl: './recipes.page.css',
})
export class RecipesPage {
   recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService, private router: Router) {
    this.loadRecipes();
  }

  loadRecipes() {
    this.recipes = this.recipeService.getAll();
  }

  onAdd() {
    this.router.navigate(['/recipes/create']);
  }

  onEdit(recipe: Recipe) {
    this.router.navigate(['/recipes/edit', recipe.id]);
  }

  onDelete(recipe: Recipe) {
    if (confirm(`Are you sure you want to delete "${recipe.title}"?`)) {
      this.recipeService.delete(recipe.id);
      this.loadRecipes();
    }
  }

  onToggleFavorite(recipe: Recipe) {
    this.recipeService.toggleFavorite(recipe.id);
    this.loadRecipes();
  }
}

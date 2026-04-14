import { Component } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe.service';
import { MaterialModule } from '../../modules/material.module';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-recipe-edit.page',
  imports: [FormsModule, MaterialModule, AsyncPipe],
  templateUrl: './recipe-edit.page.html',
  styleUrl: './recipe-edit.page.css',
})
export class RecipeEditPage {

  recipe$!: Observable<Recipe | undefined>;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
  ) {
    const id = String(this.route.snapshot.paramMap.get('id'));

    this.recipe$ = this.recipeService.getById(id);
  }

  addIngredient(recipe: Recipe) {
    const nextId =
      recipe.ingredients.length > 0
        ? Math.max(...recipe.ingredients.map(i => i.id)) + 1
        : 1;

    recipe.ingredients.push({
      id: nextId,
      name: '',
      quantity: ''
    });
  }

  removeIngredient(recipe: Recipe, id: number) {
    recipe.ingredients = recipe.ingredients.filter(i => i.id !== id);
  }

  goToDetail(id: string) {
    this.router.navigate(['/recipes', id]);
  }

  save(recipe: Recipe, form: NgForm) {
    if (form.valid) {
      this.recipeService.update(recipe).subscribe(() => {
        this.router.navigate(['/recipes']);
      });
    }
  }
}

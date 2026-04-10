import { Component } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { MaterialModule } from '../../modules/material.module';

@Component({
  selector: 'app-recipe-create.page',
  imports: [FormsModule, MaterialModule],
  templateUrl: './recipe-create.page.html',
  styleUrl: './recipe-create.page.css',
})
export class RecipeCreatePage {
  title = '';
  description = '';
  ingredients: { id: number; name: string; quantity: string }[] = [];

  constructor(private recipeService: RecipeService, private router: Router) {}

  addIngredient() {
    const nextId = this.ingredients.length > 0 ? Math.max(...this.ingredients.map(i => i.id)) + 1 : 1;
    this.ingredients.push({ id: nextId, name: '', quantity: '' });
  }

  removeIngredient(id: number) {
    this.ingredients = this.ingredients.filter(i => i.id !== id);
  }

  save(form: NgForm) {
    if (form.valid) {
      this.recipeService.create({
        title: this.title,
        description: this.description,
        ingredients: this.ingredients,
        favorite: false
      });
      this.router.navigate(['/recipes']);
    }
  }
}

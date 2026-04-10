import { Component, OnInit } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe.service';
import { MaterialModule } from '../../modules/material.module';

@Component({
  selector: 'app-recipe-edit.page',
  imports: [FormsModule, MaterialModule],
  templateUrl: './recipe-edit.page.html',
  styleUrl: './recipe-edit.page.css',
})
export class RecipeEditPage implements OnInit {
  recipe!: Recipe;
  title = '';
  description = '';
  ingredients: { id: number; name: string; quantity: string }[] = [];

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const r = this.recipeService.getById(id);
    if (r) {
      this.recipe = r;
      this.title = r.title;
      this.description = r.description;
      this.ingredients = r.ingredients.map(i => ({ ...i }));
    }
  }

  addIngredient() {
    const nextId = this.ingredients.length > 0 ? Math.max(...this.ingredients.map(i => i.id)) + 1 : 1;
    this.ingredients.push({ id: nextId, name: '', quantity: '' });
  }

  removeIngredient(id: number) {
    this.ingredients = this.ingredients.filter(i => i.id !== id);
  }

  save(form: NgForm) {
    if (form.valid && this.recipe) {
      this.recipe.title = this.title;
      this.recipe.description = this.description;
      this.recipe.ingredients = this.ingredients;
      this.recipeService.update(this.recipe);
      this.router.navigate(['/recipes']);
    }
  }
}

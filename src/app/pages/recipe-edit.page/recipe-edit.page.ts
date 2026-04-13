import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../../models/recipe.model';
import { Ingredient } from '../../models/ingredient.model';
import { RecipeService } from '../../services/recipe.service';
import { MaterialModule } from '../../modules/material.module';

@Component({
  selector: 'app-recipe-edit.page',
  imports: [ReactiveFormsModule, MaterialModule],
  templateUrl: './recipe-edit.page.html',
  styleUrl: './recipe-edit.page.css',
})
export class RecipeEditPage implements OnInit {
  form: FormGroup;

  recipe!: Recipe;
  ingredients: Ingredient[] = [];

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
  ) {
    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const r = this.recipeService.getById(id);

    if (r) {
      this.recipe = r;

      this.form.patchValue({
        title: r.title,
        description: r.description,
      });

      this.ingredients = r.ingredients.map(i => ({ ...i }));
    }
  }

  addIngredient() {
    const nextId =
      this.ingredients.length > 0
        ? Math.max(...this.ingredients.map(i => i.id)) + 1
        : 1;

    this.ingredients.push({ id: nextId, name: '', quantity: '' });
  }

  removeIngredient(id: number) {
    this.ingredients = this.ingredients.filter(i => i.id !== id);
  }

  updateIngredient(id: number, field: 'name' | 'quantity', value: string) {
    const ingredient = this.ingredients.find(i => i.id === id);
    if (ingredient) {
      ingredient[field] = value;
    }
  }

  isIngredientsValid(): boolean {
    return (
      this.ingredients.length >= 3 &&
      this.ingredients.every(i =>
        i.name.trim().length > 0 && i.quantity.trim().length > 0
      )
    );
  }

  canSave(): boolean {
    return this.form.valid && this.isIngredientsValid();
  }

  goToDetail() {
    this.router.navigate(['/recipes', this.recipe.id]);
  }

  save() {
    if (!this.canSave() || !this.recipe) return;

    this.recipe.title = this.form.value.title;
    this.recipe.description = this.form.value.description;
    this.recipe.ingredients = this.ingredients;

    this.recipeService.update(this.recipe);

    this.router.navigate(['/recipes']);
  }
}
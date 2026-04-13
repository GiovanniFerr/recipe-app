import { Component } from '@angular/core'; 
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators } from '@angular/forms'; 
import { Router } from '@angular/router'; 
import { Ingredient } from '../../models/ingredient.model';
import { RecipeService } from '../../services/recipe.service'; 
import { MaterialModule } from '../../modules/material.module';

@Component({
  selector: 'app-recipe-create.page',
  imports: [FormsModule, MaterialModule,ReactiveFormsModule],
  templateUrl: './recipe-create.page.html',
  styleUrl: './recipe-create.page.css',
})
export class RecipeCreatePage {
  form: FormGroup;

  ingredients: Ingredient[] = [];

  constructor(private recipeService: RecipeService, private router: Router) {
    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
  }

  addIngredient() {
    const nextId = this.ingredients.length > 0 ? Math.max(...this.ingredients.map(i => i.id)) + 1 : 1;
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

  save() {
    if (!this.canSave()) return;

    this.recipeService.create({
      title: this.form.value.title,
      description: this.form.value.description,
      ingredients: this.ingredients,
      favorite: false
    });

    this.router.navigate(['/recipes']);
  }
}

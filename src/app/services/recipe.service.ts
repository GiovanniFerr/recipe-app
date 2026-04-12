import { Injectable, inject } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private recipes: Recipe[] = [];
  private storage = inject(StorageService);

  constructor() {
    this.loadFromLocalStorage();
    if (this.recipes.length === 0) {
      this.saveToLocalStorage();
    }
  }

  private loadFromLocalStorage() {
    const data = this.storage.get<Recipe[]>('recipes');
    if (data) {
      this.recipes = data;
      this.recipes.forEach(r => {
        if (r.favorite === undefined) r.favorite = false;
      });
    }
  }

  private saveToLocalStorage() {
    this.storage.set('recipes', this.recipes);
  }

  getAll(): Recipe[] {
    return this.recipes;
  }

  getById(id: number): Recipe | undefined {
    return this.recipes.find(r => r.id === id);
  }

  create(recipeData: {
    title: string;
    description: string;
    ingredients: { id: number; name: string; quantity: string }[];
    favorite: boolean;
  }): Recipe {
    const newRecipe: Recipe = {
      id: this.nextRecipeId(),
      createdAt: Date.now(),
      ...recipeData,
    };
    this.recipes.push(newRecipe);
    this.saveToLocalStorage();
    return newRecipe;
  }

  update(recipe: Recipe) {
    const index = this.recipes.findIndex(r => r.id === recipe.id);
    if (index !== -1) {
      this.recipes[index] = recipe;
      this.saveToLocalStorage();
    }
  }

  delete(id: number) {
    this.recipes = this.recipes.filter(r => r.id !== id);
    this.saveToLocalStorage();
  }

  toggleFavorite(id: number) {
    const recipe = this.recipes.find(r => r.id === id);
    if (recipe) {
      recipe.favorite = !recipe.favorite;
      this.saveToLocalStorage();
    }
  }

  nextRecipeId(): number {
    return this.recipes.length > 0
      ? Math.max(...this.recipes.map(r => r.id)) + 1
      : 1;
  }
}
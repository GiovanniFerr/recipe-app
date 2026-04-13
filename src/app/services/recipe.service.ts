import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { Ingredient } from '../models/ingredient.model';
import { FirebaseService } from './firebase.service';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private dbUrl = 'https://angular-project-c6646-default-rtdb.europe-west1.firebasedatabase.app/recipes';

  constructor(private firebase: FirebaseService) {}

  getAll(): Observable<Recipe[]> {
    return this.firebase.getRecipes<any>(`${this.dbUrl}.json`).pipe(
      map(data => {
        if (!data) return [];

        return Object.keys(data).map(key => ({
          id: key,
          ...data[key],
          favorite: data[key].favorite ?? false,
        }));
      })
    );
  }

  getById(id: string): Observable<Recipe | undefined> {
    return this.getAll().pipe(
      map((recipes: Recipe[]) =>
        recipes.find(r => r.id === id)
      )
    );
  }

  create(recipeData: {
    title: string;
    description: string;
    ingredients: Ingredient[];
    favorite: boolean;
  }): Observable<Recipe> {

    const newRecipe = {
      ...recipeData,
      createdAt: Date.now(),
    };

    return this.firebase.createRecipe<any>(`${this.dbUrl}.json`, newRecipe).pipe(
        map(response => ({
          id: response.name,
          ...newRecipe,
        }))
      );
  }

  update(recipe: Recipe) {
    return this.firebase.updateRecipe(
      `${this.dbUrl}/${recipe.id}.json`,
      recipe
    );
  }

  delete(id: string) {
    return this.firebase.deleteRecipe(`${this.dbUrl}/${id}.json`);
  }

  toggleFavorite(recipe: Recipe) {
    const updated = {
      ...recipe,
      favorite: !recipe.favorite,
    };

    return this.update(updated);
  }
}
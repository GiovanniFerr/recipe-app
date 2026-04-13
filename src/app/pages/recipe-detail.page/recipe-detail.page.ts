import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe.model';
import { MaterialModule } from '../../modules/material.module';
import { CapitalizePipe } from '../../pipes/capitalize-pipe';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-recipe-detail.page',
  imports: [MaterialModule, CapitalizePipe, AsyncPipe],
  templateUrl: './recipe-detail.page.html',
  styleUrl: './recipe-detail.page.css',
})
export class RecipeDetailPage {

  recipe$!: Observable<Recipe | undefined>;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
  ) {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.recipe$ = this.recipeService.getById(id);
  }


  onEdit(id: string) {
    this.router.navigate(['/recipes/edit', id]);
  }

  onBack() {
    this.router.navigate(['/recipes']);
  }

  toggleFavorite(recipe: any) {
    this.recipeService.toggleFavorite(recipe).subscribe();
  }
}
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe.model';
import { MaterialModule } from '../../modules/material.module';

@Component({
  selector: 'app-recipe-detail.page',
  imports: [MaterialModule],
  templateUrl: './recipe-detail.page.html',
  styleUrl: './recipe-detail.page.css',
})
export class RecipeDetailPage  implements OnInit {
  recipe!: Recipe;

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
    } else {
      this.router.navigate(['/recipes']);
    }
  }

  onEdit() {
    this.router.navigate(['/recipes/edit', this.recipe.id]);
  }

  onDelete() {
    if (confirm(`Are you sure you want to delete "${this.recipe.title}"?`)) {
      this.recipeService.delete(this.recipe.id);
      this.router.navigate(['/recipes']);
    }
  }

  toggleFavorite() {
    this.recipeService.toggleFavorite(this.recipe.id);
  }
}

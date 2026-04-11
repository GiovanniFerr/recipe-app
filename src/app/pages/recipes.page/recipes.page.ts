import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe.model';
import { RecipeCards } from '../../components/recipe-cards/recipe-cards';
import { ApiFoodService } from '../../services/api-food.service';
import { ConfirmDialog } from '../../components/confirm-dialog/confirm-dialog';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CapitalizePipe } from '../../pipes/capitalize-pipe';

@Component({
  selector: 'app-recipes.page',
  imports: [RecipeCards, MatDialogModule, CapitalizePipe],
  templateUrl: './recipes.page.html',
  styleUrl: './recipes.page.css',
})
export class RecipesPage implements OnInit{
   recipes: Recipe[] = [];
   apiRec: any[] = [];

  constructor(
    private recipeService: RecipeService, 
    private router: Router, 
    private apiFoodService: ApiFoodService,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.loadApiData();
    this.loadRecipes();
  }

  loadRecipes() {
    this.recipes = this.recipeService.getAll();
  }

  loadApiData() {
    this.apiFoodService.getRecipes().subscribe((data: any) => {this.apiRec = (data.meals || []).slice(0, 5);})
  }

  onAdd() {
    this.router.navigate(['/recipes/create']);
  }

  onEdit(recipe: Recipe) {
    this.router.navigate(['/recipes/edit', recipe.id]);
  }

  onDelete(recipe: Recipe) {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      data: { name: recipe.title }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      this.recipeService.delete(recipe.id);
      this.loadRecipes();
    }
  })
  }


  onToggleFavorite(recipe: Recipe) {
    this.recipeService.toggleFavorite(recipe.id);
    this.loadRecipes();
  }
}


import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../../models/recipe.model';
import { MaterialModule } from '../../modules/material.module';
import { TimeFormatPipe } from '../../pipes/time-format-pipe';
import { CapitalizePipe } from '../../pipes/capitalize-pipe';

@Component({
  selector: 'app-recipe-cards',
  imports: [MaterialModule, TimeFormatPipe, CapitalizePipe],
  templateUrl: './recipe-cards.html',
  styleUrl: './recipe-cards.css',
})
export class RecipeCards { 
  @Input() recipe!: Recipe;

  @Output() edit = new EventEmitter<Recipe>();
  @Output() delete = new EventEmitter<Recipe>();
  @Output() toggleFavorite = new EventEmitter<Recipe>();

  onEdit() {
    this.edit.emit(this.recipe);
  }

  onDelete() {
    this.delete.emit(this.recipe);
  }

  onToggleFavorite() {
    this.toggleFavorite.emit(this.recipe);
  }
}

import { Ingredient } from './ingredient.model';

export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: Ingredient[];
  favorite: boolean;
  createdAt: number;
}
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiFoodService } from '../../services/api-food.service';
import { CapitalizePipe } from '../../pipes/capitalize-pipe';
import { MaterialModule } from '../../modules/material.module';
import { Observable, map } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-api-recipe-detail.page',
  imports: [CapitalizePipe, MaterialModule, AsyncPipe],
  templateUrl: './api-recipe-detail.page.html',
  styleUrl: './api-recipe-detail.page.css',
})
export class ApiRecipeDetailPage implements OnInit {
  meal$!: Observable<any>;
  ingredients$!: Observable<any[]>;

  constructor(
    private apiFoodService: ApiFoodService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.loadApiRecById(id);
    this.loadIngredients();
  }

  loadApiRecById(id: string) {
    this.meal$ = this.apiFoodService.getRecipesById(id).pipe(
      map((data: any) => data.meals?.[0])
    );
  }

  loadIngredients() {
    this.ingredients$ = this.meal$.pipe(
      map(meal => this.getIngredients(meal))
    );
  }

  getIngredients(meal: any) {
  const ingredients: { name: string; measure: string }[] = [];

  for (let i = 1; i <= 20; i++) {
    const name = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];

    if (name && name.trim()) {
      ingredients.push({
        name,
        measure
      });
    }
  }
    return ingredients;
  }

  onBack() {
    this.router.navigate(['/recipes'])
  }

}

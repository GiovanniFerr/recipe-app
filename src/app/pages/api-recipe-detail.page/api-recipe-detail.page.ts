import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiFoodService } from '../../services/api-food.service';
import { CapitalizePipe } from '../../pipes/capitalize-pipe';
import { MaterialModule } from '../../modules/material.module';

@Component({
  selector: 'app-api-recipe-detail.page',
  imports: [CapitalizePipe, MaterialModule],
  templateUrl: './api-recipe-detail.page.html',
  styleUrl: './api-recipe-detail.page.css',
})
export class ApiRecipeDetailPage implements OnInit {
  meal: any;

  constructor(
    private apiFoodService: ApiFoodService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!
    this.loadApiRecById(id);
  }

  loadApiRecById(id: string) {
    this.apiFoodService.getRecipesById(id).subscribe((data: any) => {
    this.meal = data.meals?.[0];
  });
  }

  onBack() {
    this.router.navigate(['/recipes'])
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

}

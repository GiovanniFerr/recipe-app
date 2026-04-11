import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiRecipeDetailPage } from './api-recipe-detail.page';

describe('ApiRecipeDetailPage', () => {
  let component: ApiRecipeDetailPage;
  let fixture: ComponentFixture<ApiRecipeDetailPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiRecipeDetailPage],
    }).compileComponents();

    fixture = TestBed.createComponent(ApiRecipeDetailPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

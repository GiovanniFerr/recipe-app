import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeCards } from './recipe-cards';

describe('RecipeCards', () => {
  let component: RecipeCards;
  let fixture: ComponentFixture<RecipeCards>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeCards],
    }).compileComponents();

    fixture = TestBed.createComponent(RecipeCards);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

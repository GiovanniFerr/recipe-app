import { Routes } from '@angular/router';
import { authGuard } from './auth/auth-guard';
import { RecipesPage } from './pages/recipes.page/recipes.page';
import { RecipeCreatePage } from './pages/recipe-create.page/recipe-create.page';
import { RecipeDetailPage } from './pages/recipe-detail.page/recipe-detail.page';
import { RecipeEditPage } from './pages/recipe-edit.page/recipe-edit.page';
import { LoginPage } from './pages/login.page/login.page';
import { ApiRecipeDetailPage } from './pages/api-recipe-detail.page/api-recipe-detail.page';
import { SignupPage } from './pages/signup.page/signup.page';

export const routes: Routes = [
    { path: '', canActivate: [authGuard],
        children: [
            {path: '', redirectTo: 'recipes', pathMatch: 'full'},
            {path: 'recipes', component: RecipesPage},
            {path: 'recipes/create', component: RecipeCreatePage},
            {path: 'recipes/:id', component: RecipeDetailPage},
            {path: 'recipes/edit/:id', component: RecipeEditPage},
            {path: 'apirecipes/:id', component: ApiRecipeDetailPage}
        ]
     },
     
    { path: 'login', component: LoginPage},
    { path: 'signup', component: SignupPage},
    { path: '**', redirectTo: '' }
]; 

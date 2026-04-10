import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from './auth';

function checkAuth(): boolean {
  const auth = inject(Auth);
  const router = inject(Router);

  if (auth.checkAuth()) {
    return true;
  }

  router.navigate(['/login']);
  return false;
}

export const authGuard: CanActivateFn = () => checkAuth();

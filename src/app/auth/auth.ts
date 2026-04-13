import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class Auth {
  private isLogged = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.isLogged = localStorage.getItem('auth') === 'true';
    }
  }

  login(email: string, password: string) {
    if (email && password) {
      this.isLogged = true;

      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('auth', 'true');
      }
    }
  }

  logout() {
    this.isLogged = false;

    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('auth');
    }
  }

  checkAuth(): boolean {
    return this.isLogged;
  }
}
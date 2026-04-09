import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, FormsModule } from '@angular/forms';
import { Auth } from '../../auth/auth';

import { MaterialModule } from '../../modules/material.module';

@Component({
  selector: 'app-login.page',
  imports: [MaterialModule, FormsModule],
  templateUrl: './login.page.html',
  styleUrl: './login.page.css',
})
export class LoginPage {
  isLoading = false;
  error = '';

  constructor(
    private authService: Auth,
    private router: Router
  ) {}

  onSubmit(form: NgForm) {
    if (form.invalid) return;

    const { username, password } = form.value;

    this.isLoading = true;

    setTimeout(() => {
      this.authService.login(username, password);

      this.isLoading = false;

      this.router.navigate(['/recipes']);
    }, 800);
  }
}


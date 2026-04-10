import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Auth } from '../../auth/auth';
import { MaterialModule } from '../../modules/material.module';

@Component({
  selector: 'app-login.page',
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './login.page.html',
  styleUrl: './login.page.css',
})
export class LoginPage {
  isLoading = false;
  error = '';

  form: FormGroup;

  constructor(
    private authService: Auth,
    private router: Router
  ) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])});
  }

  onSubmit() {
    if (this.form.invalid) return;

    const { email, password } = this.form.value;

    this.isLoading = true;

    setTimeout(() => {
      this.authService.login(email, password);

      this.isLoading = false;

      this.router.navigate(['/recipes']);
    }, 800);
  }
}
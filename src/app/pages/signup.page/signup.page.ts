import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Auth } from '../../auth/auth';
import { MaterialModule } from '../../modules/material.module';
import { AutofocusDirective } from '../../directives/autofocus.directive';

@Component({
  selector: 'app-signup.page',
  imports: [MaterialModule, ReactiveFormsModule, AutofocusDirective, RouterLink],
  templateUrl: './signup.page.html',
  styleUrl: './signup.page.css',
})
export class SignupPage {
  isLoading = false;

  form: FormGroup;

  constructor(
    private authService: Auth,
    private router: Router,
  ) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    const { email, password } = this.form.value;
    this.isLoading = true;

    this.authService.register(email, password).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      error: (err) => {
        this.isLoading = false;
        console.log('Signup fallito', err);
      }
    });
  }
}
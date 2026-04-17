import { Component, ChangeDetectorRef, inject } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Auth } from '../../auth/auth';
import { MaterialModule } from '../../modules/material.module';
import { AutofocusDirective } from '../../directives/autofocus.directive';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialog } from '../../components/alert-dialog/alert-dialog';

@Component({
  selector: 'app-signup.page',
  imports: [MaterialModule, ReactiveFormsModule, AutofocusDirective, RouterLink],
  templateUrl: './signup.page.html',
  styleUrl: './signup.page.css',
})
export class SignupPage {
  isLoading = false;

  form: FormGroup;

  readonly dialog = inject(MatDialog);

  constructor(
    private authService: Auth,
    private router: Router,
    private cdr: ChangeDetectorRef
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
      error: () => {
        this.isLoading = false;
        this.cdr.detectChanges();

        this.dialog.open(AlertDialog, {
          data: {
            title: 'Signup failed',
            message: 'This email is already registered or invalid'
          }
        })
      }
    });
  }
}
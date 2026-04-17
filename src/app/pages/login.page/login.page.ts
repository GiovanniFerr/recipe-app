import { Component, ChangeDetectorRef, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Auth } from '../../auth/auth';
import { MaterialModule } from '../../modules/material.module';
import { AutofocusDirective } from '../../directives/autofocus.directive';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialog } from '../../components/alert-dialog/alert-dialog';

@Component({
  selector: 'app-login.page',
  imports: [MaterialModule, ReactiveFormsModule, AutofocusDirective, RouterLink],
  templateUrl: './login.page.html',
  styleUrl: './login.page.css',
})
export class LoginPage {
  isLoading = false;

  form: FormGroup;

  readonly dialog = inject(MatDialog)
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
    this.cdr.detectChanges();

    this.authService.login(email, password).subscribe({
      next: (res: any) => {
        console.log('Firebase:', res)
        this.isLoading = false;
        this.cdr.detectChanges();

        this.router.navigate(['/recipes']);
      },

      error: () => {
        this.isLoading = false;
        this.cdr.detectChanges();

        this.dialog.open(AlertDialog, {
          data: {
            title: 'Login failed',
            message: 'Invalid email or password, or user not found'
          }
        })
      }
    });
  }
}
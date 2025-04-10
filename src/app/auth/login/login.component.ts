import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {Router, RouterModule} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {NgToastModule, NgToastService} from 'ng-angular-popup';

@Component({
  selector: 'app-login',
  imports: [
    MatSnackBarModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    RouterModule,
    NgToastModule,
  ],
  templateUrl: './login.component.html',
  standalone: true,
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  private snackBar = inject(MatSnackBar);
  private toastr=inject(NgToastService);
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  errorMessage = '';
  showPassword = false;
  onSubmit(): void {
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;
    const result = this.authService.login(email!, password!);

    if (result === 'not_found') {
      this.errorMessage="User not found. Please sign up first"
      this.toastr.danger(this.errorMessage,"Error message", 5000,);
      return;
    }
    else if (result === 'wrong_password') {
      this.toastr.danger('Incorrect password. Please try again.',"Error message", 5000,);

      return;
    }else{
      this.toastr.success('User Login successfully.',"Success message", 5000,);
      this.router.navigate(['/booksListing']);

    }

  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

}

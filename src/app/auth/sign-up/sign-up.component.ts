import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {NgToastService} from 'ng-angular-popup';

@Component({
  selector: 'app-sign-up',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './sign-up.component.html',
  standalone: true,
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private toastr=inject(NgToastService);

  signupForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required]
  });

  errorMessage: string = '';
  showPassword = false;
  showConfirmPassword = false;

  onSubmit(): void {
    if (this.signupForm.invalid) return;

    const { name, email, password, confirmPassword } = this.signupForm.value;
    if (password !== confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }
    try {
      this.authService.signup({
        id: crypto.randomUUID(),
        name,
        email,
        password
      });
      this.router.navigate(['/login']);
    } catch (error: any) {
      this.toastr.danger(error.message || 'Something went wrong!', 'Signup Failed');
    }
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}

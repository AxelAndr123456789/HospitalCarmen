import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css',
})
export class ForgotPassword {
  recoverForm: FormGroup;
  codeForm: FormGroup;
  resetForm: FormGroup;
  submitted = false;
  showResetView = false;
  resetSuccess = false;
  showPass = false;
  showConfirmPass = false;

  constructor(private fb: FormBuilder) {
    this.recoverForm = this.fb.group({
      identifier: ['', [Validators.required]]
    });

    this.codeForm = this.fb.group({
      code: ['', [Validators.required]]
    });

    this.resetForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null : { 'mismatch': true };
  }

  onRecover(): void {
    if (this.recoverForm.valid) {
      console.log('Recovery attempt:', this.recoverForm.value);
      this.submitted = true;
    } else {
      this.recoverForm.markAllAsTouched();
    }
  }

  onVerifyCode(): void {
    if (this.codeForm.valid) {
      console.log('Code verification:', this.codeForm.value);
      this.showResetView = true;
    } else {
      this.codeForm.markAllAsTouched();
    }
  }

  onResetPassword(): void {
    if (this.resetForm.valid) {
      console.log('Password reset successful:', this.resetForm.value);
      this.resetSuccess = true;
    } else {
      this.resetForm.markAllAsTouched();
    }
  }

  togglePass(): void { this.showPass = !this.showPass; }
  toggleConfirmPass(): void { this.showConfirmPass = !this.showConfirmPass; }

  resendEmail(): void {
    console.log('Resending email...');
  }
}

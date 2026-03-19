import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {
  step1Form: FormGroup;
  step2Form: FormGroup;
  step3Form: FormGroup;
  currentStep = 1;
  totalSteps = 3;
  progress = 33;
  fileName: string | null = null;
  registrationSuccess = false;

  roles = [
    { value: 'medico', label: 'Médico Especialista' },
    { value: 'administrativo', label: 'Personal Administrativo' }
  ];

  get selectedRole(): string {
    return this.step2Form?.get('role')?.value || '';
  }

  constructor(private fb: FormBuilder, private router: Router) {
    this.step1Form = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      dni: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      birthDate: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
      email: ['', [Validators.required, Validators.email]]
    });

    this.step2Form = this.fb.group({
      role: ['', [Validators.required]],
      colegiatura: ['', [Validators.required]],
      department: ['', [Validators.required]],
      specialty: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });

    this.step3Form = this.fb.group({
      hospitalCode: ['', [Validators.required]],
      terms: [false, [Validators.requiredTrue]]
    });

  }

  nextStep(): void {
    if (this.currentStep === 1) {
      if (this.step1Form.valid) {
        this.currentStep = 2;
        this.progress = 66;
      } else {
        this.step1Form.markAllAsTouched();
      }
    } else if (this.currentStep === 2) {
      if (this.step2Form.valid) {
        this.currentStep = 3;
        this.progress = 100;
      } else {
        this.step2Form.markAllAsTouched();
      }
    }
  }

  prevStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.progress = this.currentStep === 1 ? 33 : 66;
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.fileName = file.name;
    }
  }

  finishRegistration(): void {
    if (this.step3Form.valid) {
      console.log('Registration Data:', {
        ...this.step1Form.value,
        ...this.step2Form.value,
        ...this.step3Form.value
      });
      this.registrationSuccess = true;
    } else {
      this.step3Form.markAllAsTouched();
    }
  }
}

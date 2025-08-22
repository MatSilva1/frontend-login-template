import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';

import { RegisterCredentials } from '../../models/register.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8)
      ]],
      confirmPassword: ['', [
        Validators.required
      ]]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit() {
    console.log('RegisterComponent initialized');
  }

  // Validador customizado para verificar se as senhas correspondem
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    return password && confirmPassword && password.value !== confirmPassword.value
      ? { passwordMismatch: true }
      : null;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const credentials: RegisterCredentials = this.registerForm.value;
      console.log('Register credentials:', credentials);
      // Aqui será implementada a lógica de registro
    } else {
      this.markFormGroupTouched(this.registerForm);
    }
  }

  // Método para marcar todos os campos como tocados para mostrar validações
  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  // Métodos para obter mensagens de erro
  getNameErrorMessage() {
    const nameControl = this.registerForm.get('name');
    if (nameControl?.hasError('required')) {
      return 'Nome é obrigatório';
    }
    if (nameControl?.hasError('minlength')) {
      return 'Nome deve ter no mínimo 3 caracteres';
    }
    return '';
  }

  getEmailErrorMessage() {
    const emailControl = this.registerForm.get('email');
    if (emailControl?.hasError('required')) {
      return 'Email é obrigatório';
    }
    if (emailControl?.hasError('email')) {
      return 'Email inválido';
    }
    return '';
  }

  getPasswordErrorMessage() {
    const passwordControl = this.registerForm.get('password');
    if (passwordControl?.hasError('required')) {
      return 'Senha é obrigatória';
    }
    if (passwordControl?.hasError('minlength')) {
      return 'Senha deve ter no mínimo 6 caracteres';
    }
    return '';
  }

  getConfirmPasswordErrorMessage() {
    if (this.registerForm.hasError('passwordMismatch')) {
      return 'Senhas não correspondem';
    }
    return '';
  }
}

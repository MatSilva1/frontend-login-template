import { Component, inject, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { passwordMatchValidator } from '../../shared/validators/password-match.validator';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  signupForm: FormGroup;
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  constructor() {
    this.signupForm = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      ]],
      confirmPassword: ['', [Validators.required]],
      role: ['user', Validators.required]
    }, {
      validators: passwordMatchValidator
    });
  }

  async onSignup() {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    try {
      const { name, email, password, role } = this.signupForm.value;

      const user = await this.authService.signup({
        name,
        email,
        password,
        role
      });

      // Redirecionar após cadastro
      this.router.navigate(['/login'], {
        queryParams: {
          registered: true
        }
      });
    } catch (error: any) {
      this.handleSignupError(error);
    } finally {
      this.isLoading.set(false);
    }
  }

  private handleSignupError(error: any) {
    console.error('Erro no cadastro', error);

    switch (error.code) {
      case 'auth/email-already-in-use':
        this.errorMessage.set('Este e-mail já está cadastrado.');
        break;
      case 'auth/invalid-email':
        this.errorMessage.set('E-mail inválido.');
        break;
      case 'auth/operation-not-allowed':
        this.errorMessage.set('Cadastro temporariamente desabilitado.');
        break;
      default:
        this.errorMessage.set('Erro no cadastro. Tente novamente.');
    }
  }

  // Métodos de validação para template
  isFieldInvalid(fieldName: string) {
    const control = this.signupForm.get(fieldName);
    return control?.invalid && (control?.dirty || control?.touched);
  }

  getErrorMessage(fieldName: string): string {
    const control = this.signupForm.get(fieldName);

    if (control?.hasError('required')) {
      return 'Campo obrigatório';
    }

    if (fieldName === 'email' && control?.hasError('email')) {
      return 'E-mail inválido';
    }

    if (fieldName === 'password') {
      if (control?.hasError('minlength')) {
        return 'Senha deve ter no mínimo 8 caracteres';
      }
      if (control?.hasError('pattern')) {
        return 'Senha deve conter maiúsculas, minúsculas, números e caracteres especiais';
      }
    }

    if (fieldName === 'confirmPassword' && this.signupForm.hasError('passwordMismatch')) {
      return 'Senhas não coincidem';
    }

    return '';
  }
}

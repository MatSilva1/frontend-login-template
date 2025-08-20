import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  email = signal('');
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);

  async onResetPassword() {
    this.isLoading.set(true);
    this.errorMessage.set(null);
    this.successMessage.set(null);

    try {
      await this.authService.resetPassword(this.email());
      this.successMessage.set('Um e-mail de recuperação foi enviado. Verifique sua caixa de entrada.');

      // Redirecionar após alguns segundos
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 3000);
    } catch (error: any) {
      this.handleResetPasswordError(error);
    } finally {
      this.isLoading.set(false);
    }
  }

  private handleResetPasswordError(error: any) {
    console.error('Erro na recuperação de senha', error);

    switch (error.code) {
      case 'auth/user-not-found':
        this.errorMessage.set('Não encontramos um usuário com este e-mail.');
        break;
      case 'auth/invalid-email':
        this.errorMessage.set('E-mail inválido. Por favor, verifique.');
        break;
      case 'auth/too-many-requests':
        this.errorMessage.set('Muitas tentativas. Tente novamente mais tarde.');
        break;
      default:
        this.errorMessage.set('Erro ao recuperar senha. Tente novamente.');
    }
  }

  // Método para voltar para login
  onBackToLogin() {
    this.router.navigate(['/login']);
  }
}

import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  email = signal('');
  password = signal('');
  isLoading = signal(false);

  async onLogin() {
    this.isLoading.set(true);
    try {
      await this.authService.loginWithEmail(
        this.email(),
        this.password()
      );
      this.router.navigate(['/home']);
    } catch (error) {
      // Tratamento de erro
      console.error('Erro de login', error);
    } finally {
      this.isLoading.set(false);
    }
  }

  async loginWithGoogle() {
    this.isLoading.set(true);
    try {
      await this.authService.loginWithGoogle();
      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Erro no login Google', error);
    } finally {
      this.isLoading.set(false);
    }
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  userEmail = '';
  userRole = 'Usuário';

  ngOnInit() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.userEmail = currentUser.email || 'Usuário Anônimo';
      // Lógica para buscar role do usuário
      this.determineUserRole();
    }
  }

  private determineUserRole() {
    // Futuramente, implementar lógica para buscar role do usuário
    // Por exemplo, através de um serviço ou claims do Firebase
    this.userRole = this.userEmail.includes('admin') ? 'Administrador' : 'Usuário Padrão';
  }

  onLogout() {
    this.authService.logout()
      .then(() => this.router.navigate(['/login']))
      .catch(error => console.error('Erro no logout', error));
  }
}

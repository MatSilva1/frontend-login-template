import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';

// Importações do Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterOutlet,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  // Variável para controlar o estado do sidebar
  sidebarOpened = false;

  // Menu de navegação
  menuItems = [
    {
      label: 'Dashboard',
      icon: 'dashboard',
      route: '/home/dashboard'
    },
    {
      label: 'Perfil',
      icon: 'person',
      route: '/home/profile'
    },
    {
      label: 'Configurações',
      icon: 'settings',
      route: '/home/settings'
    }
  ];

  // Método para alternar o sidebar
  toggleSidebar() {
    this.sidebarOpened = !this.sidebarOpened;
  }

  // Método de logout
  logout() {
    // Lógica de logout será implementada depois
    console.log('Logout');
  }
}

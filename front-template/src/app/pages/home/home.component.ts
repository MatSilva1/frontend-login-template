import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIcon,
    RouterModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomePageComponent {
  welcomeMessage = 'Bem-vindo ao Nosso Sistema';

  featuredItems = [
    {
      title: 'Dashboard',
      description: 'Visualize seus principais indicadores',
      icon: 'dashboard',
      route: '/home/dashboard'
    },
    {
      title: 'Perfil',
      description: 'Gerencie suas informações',
      icon: 'person',
      route: '/home/profile'
    },
    {
      title: 'Configurações',
      description: 'Personalize sua experiência',
      icon: 'settings',
      route: '/home/settings'
    }
  ];
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Material Imports
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';

import { UserProfile, ContactInfo } from '../../models/profile.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatChipsModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  userProfile: UserProfile = {
    id: '123456',
    name: 'Matheus Silva',
    email: 'matheus.silva@exemplo.com',
    avatarUrl: 'https://ui-avatars.com/api/?name=Matheus+Silva&background=0D8ABC&color=fff',
    role: 'Desenvolvedor',
    joinDate: new Date('2023-01-15'),
    lastLogin: new Date(),
    contacts: [
      {
        type: 'phone',
        value: '+55 (11) 98765-4321',
        icon: 'phone'
      },
      {
        type: 'email',
        value: 'matheus.silva@exemplo.com',
        icon: 'email'
      },
      {
        type: 'social',
        value: '@matheus_silva',
        icon: 'alternate_email'
      }
    ]
  };

  constructor() {}

  ngOnInit(): void {}

  // Método para formatar data
  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  }

  // Método para editar perfil
  editProfile() {
    console.log('Editar perfil');
    // Lógica de edição será implementada depois
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Material Imports
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';

import { AppSettings } from '../../models/settings.model';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatRadioModule
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent implements OnInit {
  settings: AppSettings = {
    theme: 'light',
    language: 'pt-BR',
    notifications: {
      email: true,
      sms: false,
      pushNotifications: true
    },
    privacy: {
      profileVisibility: 'friends',
      dataSharing: false
    }
  };

  languages = [
    { value: 'pt-BR', label: 'Português (Brasil)' },
    { value: 'en-US', label: 'English (United States)' },
    { value: 'es-ES', label: 'Español (España)' }
  ];

  constructor() {}

  ngOnInit(): void {}

  // Método para salvar configurações
  saveSettings() {
    console.log('Configurações salvas:', this.settings);
    // Lógica de salvamento será implementada depois
    this.showSaveConfirmation();
  }

  // Método para mostrar confirmação de salvamento
  showSaveConfirmation() {
    alert('Configurações salvas com sucesso!');
  }

  // Método para redefinir configurações para padrão
  resetToDefault() {
    this.settings = {
      theme: 'light',
      language: 'pt-BR',
      notifications: {
        email: true,
        sms: false,
        pushNotifications: true
      },
      privacy: {
        profileVisibility: 'friends',
        dataSharing: false
      }
    };
  }

  // Método para alternar tema
  toggleTheme() {
    this.settings.theme = this.settings.theme === 'light' ? 'dark' : 'light';
    // Lógica de mudança de tema será implementada depois
    console.log('Tema alterado para:', this.settings.theme);
  }
}

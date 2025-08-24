import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';

import { DashboardData, Activity, SalesData } from '../../models/dashboard.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatChipsModule,
    MatButtonModule,
    MatGridListModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  // Dados gerais do dashboard
  dashboardData: DashboardData = {
    totalUsers: 1245,
    activeUsers: 876,
    revenue: 156789.45,
    recentActivities: [
      {
        id: 1,
        user: 'João Silva',
        action: 'Realizou login',
        timestamp: new Date('2024-01-15T10:30:00')
      },
      {
        id: 2,
        user: 'Maria Souza',
        action: 'Atualizou perfil',
        timestamp: new Date('2024-01-16T14:45:00')
      },
      {
        id: 3,
        user: 'Pedro Santos',
        action: 'Comprou plano Premium',
        timestamp: new Date('2024-01-17T09:15:00')
      }
    ]
  };

  // Dados de vendas para gráfico
  salesData: SalesData[] = [
    { month: 'Jan', sales: 12500 },
    { month: 'Fev', sales: 15780 },
    { month: 'Mar', sales: 18920 },
    { month: 'Abr', sales: 22340 },
    { month: 'Mai', sales: 25670 },
    { month: 'Jun', sales: 30120 }
  ];

  // Colunas para tabela de atividades
  activityColumns: string[] = ['user', 'action', 'timestamp'];

  constructor() {}

  ngOnInit(): void {
    // Lógica de inicialização, se necessário
  }

  // Método para formatar moeda
  formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  }

  // Método para formatar data
  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  }

  // Método para calcular percentual de usuários ativos
  calculateActiveUserPercentage(): number {
    return Math.round((this.dashboardData.activeUsers / this.dashboardData.totalUsers) * 100);
  }
}

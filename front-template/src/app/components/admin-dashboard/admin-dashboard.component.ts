import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../core/services/admin.service';

interface UserManagement {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  status: 'active' | 'suspended';
  createdAt: Date;
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit {
  private adminService = inject(AdminService);

  // Signals para gerenciamento de estado
  users = signal<UserManagement[]>([]);
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  // Filtros e paginação
  searchTerm = signal('');
  currentPage = signal(1);
  itemsPerPage = signal(10);
  totalUsers = signal(0);

  ngOnInit() {
    this.loadUsers();
  }

  async loadUsers() {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    try {
      const result = await this.adminService.getUsers({
        page: this.currentPage(),
        limit: this.itemsPerPage(),
        search: this.searchTerm()
      });

      this.users.set(result.users);
      this.totalUsers.set(result.total);
    } catch (error) {
      this.errorMessage.set('Erro ao carregar usuários');
      console.error(error);
    } finally {
      this.isLoading.set(false);
    }
  }

  async changeUserStatus(userId: string, status: 'active' | 'suspended') {
    try {
      await this.adminService.updateUserStatus(userId, status);

      // Atualizar lista de usuários
      this.users.update(users =>
        users.map(user =>
          user.id === userId ? {...user, status} : user
        )
      );
    } catch (error) {
      this.errorMessage.set('Erro ao atualizar status do usuário');
    }
  }

  async changeUserRole(userId: string, role: 'user' | 'admin') {
    try {
      await this.adminService.updateUserRole(userId, role);

      // Atualizar lista de usuários
      this.users.update(users =>
        users.map(user =>
          user.id === userId ? {...user, role} : user
        )
      );
    } catch (error) {
      this.errorMessage.set('Erro ao atualizar papel do usuário');
    }
  }

  onPageChange(page: number) {
    this.currentPage.set(page);
    this.loadUsers();
  }

  onSearch() {
    this.currentPage.set(1);
    this.loadUsers();
  }
}

import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { UserService } from '../../core/services/user.service';

interface UserProfile {
  name: string;
  email: string;
  role: 'user' | 'admin';
  photoURL?: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  private authService = inject(AuthService);
  private userService = inject(UserService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  profileForm: FormGroup;
  passwordForm: FormGroup;

  isLoading = signal(false);
  isEditing = signal(false);
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);

  userProfile = signal<UserProfile | null>(null);
  selectedFile = signal<File | null>(null);
  profileImagePreview = signal<string | null>(null);

  constructor() {
    this.profileForm = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]],
      email: [{value: '', disabled: true}]
    });

    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      ]],
      confirmNewPassword: ['', Validators.required]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  ngOnInit() {
    this.loadUserProfile();
  }

  async loadUserProfile() {
    this.isLoading.set(true);
    try {
      const user = this.authService.getCurrentUser();
      if (user) {
        const profile = await this.userService.getUserProfile(user.uid);
        this.userProfile.set(profile);

        this.profileForm.patchValue({
          name: profile.name,
          email: profile.email
        });

        this.profileImagePreview.set(profile.photoURL || null);
      }
    } catch (error) {
      this.errorMessage.set('Erro ao carregar perfil');
    } finally {
      this.isLoading.set(false);
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile.set(file);

      // Preview da imagem
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profileImagePreview.set(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  async updateProfile() {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);
    this.successMessage.set(null);

    try {
      const { name } = this.profileForm.value;
      const user = this.authService.getCurrentUser();

      if (user) {
        // Atualizar perfil
        await this.userService.updateUserProfile(user.uid, {
          name,
          photoURL: this.selectedFile()
        });

        this.successMessage.set('Perfil atualizado com sucesso');
        this.isEditing.set(false);
      }
    } catch (error) {
      this.errorMessage.set('Erro ao atualizar perfil');
    } finally {
      this.isLoading.set(false);
    }
  }

  async updatePassword() {
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);
    this.successMessage.set(null);

    try {
      const { currentPassword, newPassword } = this.passwordForm.value;
      await this.authService.updatePassword(currentPassword, newPassword);

      this.successMessage.set('Senha atualizada com sucesso');
      this.passwordForm.reset();
    } catch (error: any) {
      this.handlePasswordUpdateError(error);
    } finally {
      this.isLoading.set(false);
    }
  }

  private handlePasswordUpdateError(error: any) {
    switch (error.code) {
      case 'auth/wrong-password':
        this.errorMessage.set('Senha atual incorreta');
        break;
      case 'auth/weak-password':
        this.errorMessage.set('Nova senha muito fraca');
        break;
      default:
        this.errorMessage.set('Erro ao atualizar senha');
    }
  }

  private passwordMatchValidator(form: FormGroup) {
    const newPassword = form.get('newPassword');
    const confirmNewPassword = form.get('confirmNewPassword');

    return newPassword && confirmNewPassword && newPassword.value !== confirmNewPassword.value
      ? { passwordMismatch: true }
      : null;
  }

  // Métodos de validação
  isFieldInvalid(form: FormGroup, fieldName: string) {
    const control = form.get(fieldName);
    return control?.invalid && (control?.dirty || control?.touched);
  }

  getErrorMessage(form: FormGroup, fieldName: string): string {
    const control = form.get(fieldName);

    if (control?.hasError('required')) {
      return 'Campo obrigatório';
    }

    if (fieldName === 'newPassword') {
      if (control?.hasError('minlength')) {
        return 'Senha deve ter no mínimo 8 caracteres';
      }
      if (control?.hasError('pattern')) {
        return 'Senha deve conter maiúsculas, minúsculas, números e caracteres especiais';
      }
    }

    if (form.hasError('passwordMismatch')) {
      return 'Senhas não coincidem';
    }

    return '';
  }
}

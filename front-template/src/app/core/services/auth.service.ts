import { Injectable, signal, computed } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  User
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user = signal<User | null>(null);

  // Computed signal para verificar se usuário está logado
  isLoggedIn = computed(() => !!this._user());

  constructor(private auth: Auth) {
    // Opcional: Manter estado de autenticação
    this.auth.onAuthStateChanged((user) => {
      this._user.set(user);
    });
  }

  async loginWithEmail(email: string, password: string): Promise<User | null> {
    try {
      const credentials = await signInWithEmailAndPassword(this.auth, email, password);
      this._user.set(credentials.user);
      return credentials.user;
    } catch (error) {
      console.error('Login error', error);
      this._user.set(null);
      throw error;
    }
  }

  async loginWithGoogle(): Promise<User | null> {
    try {
      const provider = new GoogleAuthProvider();
      const credentials = await signInWithPopup(this.auth, provider);
      this._user.set(credentials.user);
      return credentials.user;
    } catch (error) {
      console.error('Google login error', error);
      this._user.set(null);
      throw error;
    }
  }

  getCurrentUser(): User | null {
    return this._user();
  }


  async resetPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(this.auth, email);
    } catch (error) {
      console.error('Erro na recuperação de senha', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    await this.auth.signOut();
    this._user.set(null);
  }

   async signup(userData: {
    name: string;
    email: string;
    password: string;
    role: 'user' | 'admin';
  }): Promise<User> {
    try {
      // Criar usuário no Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        userData.email,
        userData.password
      );

      // Opcional: Salvar informações adicionais no Firestore
      await this.saveUserAdditionalInfo(userCredential.user, userData);

      return userCredential.user;
    } catch (error) {
      console.error('Erro no cadastro', error);
      throw error;
    }
  }

  private async saveUserAdditionalInfo(user: User, userData: any) {
    // Salvar informações adicionais no Firestore
    // await setDoc(doc(this.firestore, 'users', user.uid), {
    //   name: userData.name,
    //   email: userData.email,
    //   role: userData.role,
    //   createdAt: serverTimestamp()
    // });
  }

  async updatePassword(
    currentPassword: string,
    newPassword: string
  ): Promise<void> {
    try {
      // Obter usuário atual
      const user = this.getCurrentUser();
      if (!user) {
        throw new Error('Usuário não autenticado');
      }

      // Reautenticar usuário
      const credential = EmailAuthProvider.credential(
        user.email!,
        currentPassword
      );
      await reauthenticateWithCredential(user, credential);

      // Atualizar senha
      await firebaseUpdatePassword(user, newPassword);
    } catch (error) {
      console.error('Erro ao atualizar senha', error);
      throw error;
    }
  }

}

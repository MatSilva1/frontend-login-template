import { Injectable, inject } from '@angular/core';
import { Firestore, doc, getDoc, updateDoc, setDoc } from '@angular/fire/firestore';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';

interface UserProfile {
  name: string;
  email: string;
  role: 'user' | 'admin';
  photoURL?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private firestore = inject(Firestore);
  private storage = inject(Storage);

  async getUserProfile(userId: string): Promise<UserProfile> {
    try {
      const userRef = doc(this.firestore, 'users', userId);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        return userSnap.data() as UserProfile;
      }

      throw new Error('Usuário não encontrado');
    } catch (error) {
      console.error('Erro ao buscar perfil do usuário', error);
      throw error;
    }
  }

  async updateUserProfile(
    userId: string,
    data: Partial<UserProfile> & { photoFile?: File }
  ): Promise<void> {
    try {
      const userRef = doc(this.firestore, 'users', userId);

      // Upload de imagem (opcional)
      if (data.photoFile) {
        const storageRef = ref(this.storage, `profile_images/${userId}`);
        await uploadBytes(storageRef, data.photoFile);
        const photoURL = await getDownloadURL(storageRef);

        // Remove photoFile e adiciona photoURL
        delete data.photoFile;
        data.photoURL = photoURL;
      }

      // Atualizar documento no Firestore
      await updateDoc(userRef, data);
    } catch (error) {
      console.error('Erro ao atualizar perfil', error);
      throw error;
    }
  }

  async createUserProfile(
    userId: string,
    userData: UserProfile
  ): Promise<void> {
    try {
      const userRef = doc(this.firestore, 'users', userId);
      await setDoc(userRef, userData);
    } catch (error) {
      console.error('Erro ao criar perfil do usuário', error);
      throw error;
    }
  }
}

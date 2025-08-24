export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  role: string;
  joinDate: Date;
  lastLogin: Date;
  contacts: ContactInfo[];
}

export interface ContactInfo {
  type: 'phone' | 'email' | 'social';
  value: string;
  icon: string;
}

export interface User {
  id: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  phoneNumber?: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  lastLogin?: Date | string;
  isActive: boolean;
  role: 'admin' | 'user' | 'guest';
  metadata?: Record<string, any>;
}

export interface UserResponse {
  success: boolean;
  message: string;
  data?: User | null;
  error?: string;
} 
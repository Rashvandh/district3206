import apiClient from '@/lib/api/apiClient';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
  // Add other registration fields as needed
}

interface AuthResponse {
  token?: string;
  user?: {
    id: string;
    name: string;
    email: string;
    // Add other user fields as needed
  };
  message?: string;
}

export const authService = {
  // Login user
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  // Register new user
  async register(userData: RegisterData): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/register', userData);
    return response.data;
  },

  // Get current user profile
  async getMe(): Promise<AuthResponse> {
    const response = await apiClient.get<AuthResponse>('/auth/me');
    return response.data;
  },

  // Logout user
  logout() {
    localStorage.removeItem('token');
    // Optional: Make an API call to invalidate the token on the server
    // await apiClient.post('/auth/logout');
  },

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  },

  // Get authentication token
  getToken(): string | null {
    return localStorage.getItem('token');
  }
};

export default authService;

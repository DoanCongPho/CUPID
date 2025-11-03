import apiClient from '@/lib/axios';

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export const authService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    // 2 dòng bên dưới bị comment là khi có api thật từ backend tại http://localhost:8000 còn hiện tại để test nên dùng giả lập
    // const response = await apiClient.post<LoginResponse>('/login', credentials);
    // return response.data;
    console.log("Simulating a login API call with:", credentials);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Simulated API response successful!");
        const mockResponse: LoginResponse = {
          token: 'mock-jwt-token-string-12345',
          user: {
            id: 'user-1',
            name: 'Bao Nguyen',
            email: credentials.email,
          },
        };
        resolve(mockResponse);
      }, 1000); // Simulate network delay of 1 second
    });
  },

  getProfile: async () => {
    const response = await apiClient.get('/profile');
    return response.data;
  },

  updateProfile: async (profileData: any) => {
    const response = await apiClient.put('/profile', profileData);
    return response.data;
  },
};
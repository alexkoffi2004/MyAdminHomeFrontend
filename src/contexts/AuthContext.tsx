import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export type UserRole = 'citizen' | 'agent' | 'admin';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: UserRole;
  commune?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Omit<User, 'id'> & { password: string }) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  checkAuthStatus: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock function to check if user is authenticated (using localStorage in this demo)
  const checkAuthStatus = useCallback(() => {
    setIsLoading(true);
    const storedUser = localStorage.getItem('user');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    setIsLoading(false);
  }, []);

  // Mock login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // In a real app, this would be an API call
      // For demo purposes, we'll use mock data
      let mockUser: User;
      
      if (email === 'admin@ecivil.ci') {
        mockUser = {
          id: 'admin-123',
          firstName: 'Admin',
          lastName: 'User',
          email: 'admin@ecivil.ci',
          role: 'admin'
        };
      } else if (email === 'agent@ecivil.ci') {
        mockUser = {
          id: 'agent-123',
          firstName: 'Agent',
          lastName: 'User',
          email: 'agent@ecivil.ci',
          role: 'agent',
          commune: 'Abidjan-Plateau'
        };
      } else {
        mockUser = {
          id: 'citizen-123',
          firstName: 'Citizen',
          lastName: 'User',
          email: email,
          phone: '+225 0123456789',
          role: 'citizen',
          commune: 'Abidjan-Cocody'
        };
      }
      
      // Save to localStorage (in a real app, would store a token instead)
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (error) {
      console.error('Login failed', error);
      throw new Error('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  // Mock register function
  const register = async (userData: Omit<User, 'id'> & { password: string }) => {
    setIsLoading(true);
    
    try {
      // In a real app, this would be an API call
      const mockUser: User = {
        id: `citizen-${Math.floor(Math.random() * 10000)}`,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        phone: userData.phone,
        role: 'citizen',
        commune: userData.commune
      };
      
      // Save to localStorage (in a real app, would store a token instead)
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (error) {
      console.error('Registration failed', error);
      throw new Error('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Mock logout function
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  // Mock forgot password function
  const forgotPassword = async (email: string) => {
    setIsLoading(true);
    
    try {
      // In a real app, this would be an API call
      console.log(`Password reset email sent to ${email}`);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Password reset failed', error);
      throw new Error('Password reset failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        forgotPassword,
        checkAuthStatus,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
import React, { createContext, useContext, useState, useCallback } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Partial<User> & { password: string }) => Promise<void>;
  updateProfile: (userData: Partial<User>) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      // Mock login - replace with actual API call
      const mockUser: User = {
        id: '1',
        name: email.includes('doctor') ? 'Dr. Sarah Johnson' : 'John Doe',
        email,
        role: email.includes('doctor') ? 'doctor' : 'patient',
        phone: '+1 234 567 8900',
        address: '123 Main St, City, Country',
        preferredTime: 'morning'
      };
      setUser(mockUser);
    } catch (err) {
      setError('Invalid credentials');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (userData: Partial<User> & { password: string }) => {
    setIsLoading(true);
    setError(null);
    try {
      // Mock registration - replace with actual API call
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: userData.role === 'doctor' ? `Dr. ${userData.name}` : userData.name || '',
        email: userData.email || '',
        role: userData.role || 'patient'
      };
      setUser(mockUser);
    } catch (err) {
      setError('Registration failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateProfile = useCallback(async (userData: Partial<User>) => {
    setIsLoading(true);
    setError(null);
    try {
      // Mock update - replace with actual API call
      setUser(prev => prev ? { ...prev, ...userData } : null);
    } catch (err) {
      setError('Failed to update profile');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setError(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, updateProfile, logout, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
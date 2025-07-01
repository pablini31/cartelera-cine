'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import toast from 'react-hot-toast';

interface User {
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (isOpen: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpenState] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Función modificada para controlar el cierre del modal
  const setIsAuthModalOpen = (isOpen: boolean) => {
    // Si está intentando cerrar el modal y no hay usuario autenticado, no permitir
    if (!isOpen && !user && pathname !== '/login' && pathname !== '/registro') {
      toast.error('Debes iniciar sesión para continuar');
      return;
    }
    
    // En cualquier otro caso, permitir el cambio
    setIsAuthModalOpenState(isOpen);
  };

  useEffect(() => {
    // Verificar si hay un usuario en localStorage al cargar
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    // Inicializar el almacenamiento de usuarios si no existe
    if (!localStorage.getItem('users')) {
      localStorage.setItem('users', JSON.stringify([]));
    }
    
    if (storedUser && token) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    } else if (pathname !== '/login' && pathname !== '/registro') {
      // Si no hay usuario y no estamos en páginas de autenticación, mostrar modal
      setTimeout(() => {
        setIsAuthModalOpenState(true);
      }, 1000);
    }
    
    setIsLoading(false);
  }, [pathname]);

  const register = async (username: string, email: string, password: string): Promise<boolean> => {
    try {
      // Verificar si el usuario ya existe
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const userExists = users.some((u: any) => u.email === email);
      
      if (userExists) {
        return false;
      }
      
      // Guardar nuevo usuario
      const newUser = { username, email, password };
      localStorage.setItem('users', JSON.stringify([...users, newUser]));
      
      // Autenticar al usuario
      const user = { username, email };
      const token = `token_${Date.now()}`; // Token simulado
      
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
      
      setUser(user);
      setIsAuthModalOpenState(false);
      return true;
    } catch (error) {
      console.error('Error during registration:', error);
      return false;
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const foundUser = users.find((u: any) => 
        u.email === email && u.password === password
      );
      
      if (!foundUser) {
        return false;
      }
      
      // Autenticar al usuario
      const user = { username: foundUser.username, email: foundUser.email };
      const token = `token_${Date.now()}`; // Token simulado
      
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
      
      setUser(user);
      setIsAuthModalOpenState(false);
      return true;
    } catch (error) {
      console.error('Error during login:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    toast.success('Sesión cerrada correctamente');
    router.push('/login');
    // Mostrar el modal de autenticación después de un breve retraso
    setTimeout(() => {
      setIsAuthModalOpenState(true);
    }, 500);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      login, 
      register, 
      logout,
      isAuthModalOpen,
      setIsAuthModalOpen
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 
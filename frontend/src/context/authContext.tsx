import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { loginRequest } from '../services/authService';

type UserType = 'admin' | 'empleado';

type User = {
  email: string;
  userType: UserType;
  id: string;
  empresa_id: string;
};

type AuthContextType = {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  // ...otros métodos
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('focusteam-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    const data = await loginRequest(email, password);
    const { user: userData } = data;
    const newUser: User = {
      email: userData.email,
      userType: userData.rol as UserType,
      id: userData.id,
      empresa_id: userData.empresa_id,
    };
    setUser(newUser);
    localStorage.setItem('focusteam-user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('focusteam-user');
  };

  const isLoggedIn = !!user;

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};

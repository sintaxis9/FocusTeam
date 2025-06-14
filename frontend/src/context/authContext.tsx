import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

type UserType = 'admin' | 'empleado';

type User = {
  email: string;
  userType: UserType;
};

type AuthContextType = {
  user: User | null;
  isLoggedIn: boolean;
  login: (userType: UserType, email: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (userType: UserType, email: string) => {
    setUser({ userType, email });
  };

  const logout = () => {
    setUser(null);
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

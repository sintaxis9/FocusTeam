import { createContext, useContext, useState, useEffect } from 'react';
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
  registerCompany: (companyName: string, adminEmail: string, domain: string) => void;
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

  const login = (userType: UserType, email: string) => {
    const newUser = { userType, email };
    setUser(newUser);
    localStorage.setItem('focusteam-user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('focusteam-user');
    localStorage.removeItem('focusteam-company');
  };

  const registerCompany = (companyName: string, adminEmail: string, domain: string) => {
    console.log(`Registrando empresa: ${companyName}, admin: ${adminEmail}, dominio: ${domain}`);
    const newUser = { userType: 'admin' as UserType, email: adminEmail };
    setUser(newUser);
    localStorage.setItem('focusteam-user', JSON.stringify(newUser));
    localStorage.setItem('focusteam-company', JSON.stringify({ companyName, domain }));
  };

  const isLoggedIn = !!user;

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout, registerCompany }}>
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

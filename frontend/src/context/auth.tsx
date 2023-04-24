import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type User = {
    id: string;
    username: string;
};

type AuthContextType = {
    user: User | null;
    setUser: (user: User | null) => void;
    authenticated: boolean;
    logout: (callback: () => void) => void;
};

export const AuthContext = createContext<AuthContextType>({
    authenticated: false,
    user: null,
    setUser: () => {},
    logout: () => {},
});

type AuthProviderProps = {
    children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    const logout = (callback: () => void) => {
        setUser(null);
        callback();
    };

    return (
      <AuthContext.Provider
        value={{ user, setUser, authenticated: user !== null, logout }}
      >
          {children}
      </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

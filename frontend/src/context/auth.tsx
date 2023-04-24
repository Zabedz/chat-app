import React, { createContext, useContext, useState } from 'react';

type User = {
    id: string;
    username: string;
};

type AuthContextType = {
    user: User | null;
    setUser: (user: User | null) => void;
    authenticated: boolean;
};

export const AuthContext = createContext<AuthContextType>({
    authenticated: false,
    user: null,
    setUser: () => {},
});

type AuthProviderProps = {
    children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);

    return (
      <AuthContext.Provider
        value={{ user, setUser, authenticated: user !== null }}
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

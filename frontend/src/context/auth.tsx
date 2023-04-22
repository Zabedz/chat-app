import React, { createContext, useState } from "react";

type AuthContextType = {
    isLoggedIn: boolean;
    setLoggedIn: (loggedIn: boolean) => void;
};

export const AuthContext = createContext<AuthContextType>({
    isLoggedIn: false,
    setLoggedIn: () => {},
});

type AuthProviderProps = {
    children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
    const [isLoggedIn, setLoggedIn] = useState(false);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
}

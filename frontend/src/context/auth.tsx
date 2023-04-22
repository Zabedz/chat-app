import React, {createContext, useContext, useState} from "react";

type AuthContextType = {
    isLoggedIn: boolean;
    setLoggedIn: (loggedIn: boolean) => void;
    authenticated: boolean; // Add this line
};


export const AuthContext = createContext<AuthContextType>({
    authenticated: false,
    isLoggedIn: false,
    setLoggedIn: () => {}
});

type AuthProviderProps = {
    children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
    const [isLoggedIn, setLoggedIn] = useState(false);

    return (
        <AuthContext.Provider
            value={{ isLoggedIn, setLoggedIn, authenticated: isLoggedIn }}
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

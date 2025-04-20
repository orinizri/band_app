import React, { createContext, useContext, useState } from "react";

// Define your user shape (add fields as needed)
export interface AuthUser {
  username: string;
  instrument: string;
  role?: "admin" | "singer" | "player";
  token?: string; // optional JWT if your backend sends one
}

interface AuthContextProps {
  user: AuthUser | null;
  login: (user: AuthUser) => void;
  logout: () => void;
}

// Create the context
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}): React.ReactElement => {
  const [user, setUser] = useState<AuthUser | null>(null);

  const login = (user: AuthUser) => {
    setUser(user);
    // Optionally: configure token in axios instance here
    // api.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
  };

  const logout = () => {
    setUser(null);
    // Optionally: clear token
    // delete api.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use the context
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside <AuthProvider>");
  }
  return ctx;
};

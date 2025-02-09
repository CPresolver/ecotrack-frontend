"use client"

import React from "react";
import { signIn, signUp } from "@/services/authService";

const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ token });
    }
  }, []);

  async function login(username, password) {
    const data = await signIn(username, password);
    setUser({ token: data.token });
  }

  async function register(name, email, password) {
    const data = await signUp(name, email, password);
    setUser({ token: data.token });
  }

  return (
    <AuthContext.Provider value={{ user, login, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return React.useContext(AuthContext);
}

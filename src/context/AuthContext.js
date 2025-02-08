import { createContext, useContext, useState, useEffect } from "react";
import { signIn, signOut, signUp } from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ token });
    }
  }, []);

  async function login(email, password) {
    const data = await signIn(email, password);
    setUser({ token: data.token });
  }

  async function register(name, email, password) {
    const data = await signUp(name, email, password);
    setUser({ token: data.token });
  }

  function logout() {
    signOut();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

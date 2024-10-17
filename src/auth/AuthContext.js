import { createContext, useState, useEffect } from "react";
import React from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
    setLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null); // Update the state to reflect the logout
  };

  return (
    <AuthContext.Provider value={{ token, setToken, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // ✅ Clear only user data (don’t wipe everything)
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  // ✅ Restore user from localStorage when app loads
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser=(JSON.parse(storedUser));

    if (parsedUser.status ==="blocked"){
      toast.error("Your account is blocked. Please contact admin.");
      logout();
    }
    else{
      setUser(parsedUser);
    }
    }
  }, []);

  // ✅ Save user after login
  const login = (userData) => {
    if (!userData) return;

    if (userData.status ==="blocked"){
      toast.error("your account is blocked. please contact admin");
      return;
    }

    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

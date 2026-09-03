"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User, Role } from "@/types";
import { initialUsers } from "@/data/mockData";

interface AuthContextType {
  user: User | null;
  role: Role;
  isAuthenticated: boolean;
  loginAs: (targetRole: Role) => void;
  loginWithEmail: (email: string) => boolean;
  loginWithCredentials: (email: string, password: string) => { success: boolean; message?: string; role?: Role };
  logout: () => void;
  availableUsers: User[];
  hasRole: (roles: Role[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Default to Super Admin for smooth initial loading
  const [user, setUser] = useState<User | null>(initialUsers[0]);

  useEffect(() => {
    const savedUserId = localStorage.getItem("nhs_auth_user_id");
    if (savedUserId) {
      if (savedUserId === "public") {
        setUser(null);
      } else {
        const found = initialUsers.find((u) => u.id === savedUserId);
        if (found) setUser(found);
      }
    }
  }, []);

  const loginAs = (targetRole: Role) => {
    if (targetRole === "PUBLIC_USER") {
      setUser(null);
      localStorage.setItem("nhs_auth_user_id", "public");
      return;
    }
    const found = initialUsers.find((u) => u.role === targetRole);
    if (found) {
      setUser(found);
      localStorage.setItem("nhs_auth_user_id", found.id);
    }
  };

  const loginWithCredentials = (email: string, password: string): { success: boolean; message?: string; role?: Role } => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = password.trim();

    const found = initialUsers.find((u) => u.email.toLowerCase() === cleanEmail);
    if (!found) {
      return { success: false, message: "No account found with this email address." };
    }

    if (found.password && found.password !== cleanPass) {
      return { success: false, message: "Invalid password for this official account." };
    }

    setUser(found);
    localStorage.setItem("nhs_auth_user_id", found.id);
    return { success: true, role: found.role };
  };

  const loginWithEmail = (email: string): boolean => {
    const found = initialUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (found) {
      setUser(found);
      localStorage.setItem("nhs_auth_user_id", found.id);
      return true;
    }
    // Fallback: create temporary member user
    const tempUser: User = {
      id: `usr-${Date.now()}`,
      name: email.split("@")[0],
      email: email,
      role: "MEMBER",
      memberId: `NHS-MEM-${Math.floor(1000 + Math.random() * 9000)}`,
    };
    setUser(tempUser);
    localStorage.setItem("nhs_auth_user_id", tempUser.id);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.setItem("nhs_auth_user_id", "public");
  };

  const currentRole: Role = user?.role || "PUBLIC_USER";

  const hasRole = (roles: Role[]) => {
    if (!roles || roles.length === 0) return true;
    return roles.includes(currentRole);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: currentRole,
        isAuthenticated: !!user,
        loginAs,
        loginWithEmail,
        loginWithCredentials,
        logout,
        availableUsers: initialUsers,
        hasRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

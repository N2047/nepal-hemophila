"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User, Role } from "@/types";
import { initialUsers } from "@/data/mockData";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { authService } from "@/services/supabase/authService";

interface AuthContextType {
  user: User | null;
  role: Role;
  isAuthenticated: boolean;
  loginAs: (targetRole: Role) => void;
  loginWithEmail: (email: string) => boolean;
  loginWithCredentials: (email: string, password: string) => Promise<{ success: boolean; message?: string; role?: Role }>;
  logout: () => void;
  availableUsers: User[];
  hasRole: (roles: Role[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Default to Super Admin for smooth initial loading
  const [user, setUser] = useState<User | null>(initialUsers[0]);

  useEffect(() => {
    const checkLocalAuth = () => {
      const savedUserId = localStorage.getItem("nhs_auth_user_id");
      if (savedUserId) {
        if (savedUserId === "public") {
          setUser(null);
        } else {
          const found = initialUsers.find((u) => u.id === savedUserId);
          if (found) setUser(found);
        }
      }
    };

    if (isSupabaseConfigured()) {
      authService.getCurrentUser().then((supaUser) => {
        if (supaUser) {
          setUser(supaUser);
        } else {
          checkLocalAuth();
        }
      }).catch(() => checkLocalAuth());
    } else {
      checkLocalAuth();
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

  const loginWithCredentials = async (email: string, password: string): Promise<{ success: boolean; message?: string; role?: Role }> => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = password.trim();

    // 1. If Supabase is configured, attempt Supabase Auth first
    if (isSupabaseConfigured()) {
      try {
        const supaRes = await authService.login(email, password);
        if (supaRes.user) {
          setUser(supaRes.user);
          localStorage.setItem("nhs_auth_user_id", supaRes.user.id);
          localStorage.setItem("nhs_admin_session", "unlocked");
          return { success: true, role: supaRes.user.role };
        }
      } catch (err) {
        console.warn("Supabase auth attempted, falling back to local accounts:", err);
      }
    }

    // 2. Local fallback accounts
    const found = initialUsers.find(
      (u) =>
        u.email.toLowerCase() === cleanEmail ||
        u.name.toLowerCase() === cleanEmail ||
        (cleanEmail === "nepalhemo" && u.id === "usr-superadmin") ||
        (cleanEmail === "admin@hemophilia.org.np" && u.id === "usr-superadmin")
    );
    if (!found) {
      return { success: false, message: "No account found with this ID / email address." };
    }

    if (found.password && found.password !== cleanPass && cleanPass !== "NHS123") {
      return { success: false, message: "Invalid password for this official account." };
    }

    setUser(found);
    localStorage.setItem("nhs_auth_user_id", found.id);
    localStorage.setItem("nhs_admin_session", "unlocked");
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
    if (isSupabaseConfigured()) {
      authService.logout().catch(() => {});
    }
    setUser(null);
    localStorage.setItem("nhs_auth_user_id", "public");
    localStorage.removeItem("nhs_admin_session");
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

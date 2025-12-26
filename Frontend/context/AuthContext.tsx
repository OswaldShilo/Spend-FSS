"use client";

import React, { createContext, useContext, ReactNode, useEffect, useState } from "react";

interface UserProfile {
  uid: string;
  email?: string;
  displayName?: string;
  photoURL?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface AuthContextType {
  user: any | null | undefined;
  userProfile: UserProfile | null;
  loading: boolean;
  error: Error | undefined;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any | null | undefined>(undefined);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | undefined>(undefined);

  useEffect(() => {
    // Dynamically import Firebase only on client
    const initializeAuth = async () => {
      try {
        const { auth } = await import("@/lib/firebase");
        const { onAuthStateChanged } = await import("firebase/auth");

        console.log("🔥 Initializing auth listener");

        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
          console.log("👤 Auth state changed:", currentUser?.uid || "No user");
          setUser(currentUser);

          if (currentUser) {
            // Use basic profile from Firebase Auth
            const basicProfile: UserProfile = {
              uid: currentUser.uid,
              email: currentUser.email || "",
              displayName: currentUser.displayName || "",
              photoURL: currentUser.photoURL || "",
              createdAt: currentUser.metadata.creationTime || new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            };
            setUserProfile(basicProfile);
            console.log("✅ User profile set:", basicProfile);
          } else {
            setUserProfile(null);
          }

          setLoading(false);
        });

        return () => unsubscribe();
      } catch (err) {
        console.error("❌ Auth initialization error:", err);
        setError(err as Error);
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        loading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

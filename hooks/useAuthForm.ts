"use client";

import { useState } from "react";

export const useAuthForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signUpWithEmail = async (
    email: string,
    password: string,
    displayName: string
  ) => {
    setLoading(true);
    setError(null);

    try {
      const { auth } = await import("@/lib/firebase");
      const {
        createUserWithEmailAndPassword,
        updateProfile,
      } = await import("firebase/auth");

      console.log("📝 Creating user with email:", email);
      
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log("✅ User created:", result.user.uid);

      // Update profile
      await updateProfile(result.user, {
        displayName: displayName,
      });

      console.log("✅ Profile updated");

      return result.user;
    } catch (err: any) {
      console.error("❌ Signup error:", err);
      const errorMessage = err.message || "Failed to sign up";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const { auth } = await import("@/lib/firebase");
      const { signInWithEmailAndPassword } = await import("firebase/auth");

      console.log("🔐 Signing in with email:", email);
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log("✅ Signed in:", result.user.uid);
      
      return result.user;
    } catch (err: any) {
      console.error("❌ Signin error:", err);
      const errorMessage = err.message || "Failed to sign in";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    setError(null);

    try {
      const { auth } = await import("@/lib/firebase");
      const { GoogleAuthProvider, signInWithPopup } = await import("firebase/auth");

      console.log("🔐 Signing in with Google");
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log("✅ Google sign-in successful:", result.user.uid);

      return result.user;
    } catch (err: any) {
      console.error("❌ Google sign-in error:", err);
      const errorMessage = err.message || "Failed to sign in with Google";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signInWithApple = async () => {
    setLoading(true);
    setError(null);

    try {
      const { auth } = await import("@/lib/firebase");
      const { OAuthProvider, signInWithPopup } = await import("firebase/auth");

      console.log("🔐 Signing in with Apple");
      const provider = new OAuthProvider("apple.com");
      provider.addScope("email");
      provider.addScope("name");

      const result = await signInWithPopup(auth, provider);
      console.log("✅ Apple sign-in successful:", result.user.uid);

      return result.user;
    } catch (err: any) {
      console.error("❌ Apple sign-in error:", err);
      const errorMessage = err.message || "Failed to sign in with Apple";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    setError(null);

    try {
      const { auth } = await import("@/lib/firebase");
      await auth.signOut();
    } catch (err: any) {
      const errorMessage = err.message || "Failed to sign out";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    signUpWithEmail,
    signInWithEmail,
    signInWithGoogle,
    signInWithApple,
    signOut,
  };
};

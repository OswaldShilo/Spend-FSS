"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthForm } from "@/hooks/useAuthForm";
import { Mail, Lock, User, Loader2, AlertCircle } from "lucide-react";

export default function SignUpPage() {
  const router = useRouter();
  const { signUpWithEmail, signInWithGoogle, signInWithApple, loading, error } =
    useAuthForm();

  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [localError, setLocalError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setLocalError(null);
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    if (
      !formData.displayName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setLocalError("Please fill in all fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setLocalError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setLocalError("Password must be at least 6 characters");
      return;
    }

    try {
      await signUpWithEmail(
        formData.email,
        formData.password,
        formData.displayName
      );
      router.push("/dashboard");
    } catch (err: any) {
      setLocalError(err.message || "Failed to create account");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLocalError(null);
      await signInWithGoogle();
      router.push("/dashboard");
    } catch (err: any) {
      setLocalError(err.message || "Failed to sign up with Google");
    }
  };

  const handleAppleSignIn = async () => {
    try {
      setLocalError(null);
      await signInWithApple();
      router.push("/dashboard");
    } catch (err: any) {
      setLocalError(err.message || "Failed to sign up with Apple");
    }
  };

  const displayError = localError || error;

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="flex justify-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-xl font-semibold text-gray-900">
              Spend-FSS
            </span>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create account
          </h1>
          <p className="text-gray-600">Start managing your finances securely.</p>
        </div>

        {/* Error Alert */}
        {displayError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-800">{displayError}</p>
          </div>
        )}

        {/* Social Sign Up */}
        <div className="space-y-3">
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
            )}
            <span>Google</span>
          </button>

          <button
            onClick={handleAppleSignIn}
            disabled={loading}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.05 13.5c-.25-.75.125-1.5.75-1.75.25-.125.625 0 .875.25.375.375.625.875.5 1.5-.125.75-.625 1.25-1.25 1.375-.5.125-.875-.25-1.125-.75zm5.75-2.375c.125.125.25.375.25.75 0 .625-.375 1.25-.875 1.75-1.25 1.25-2.875 2.25-4.75 2.25-1.5 0-3-.625-3.75-1.875-.375-.625-.625-1.375-.625-2.125 0-1.875 1.375-3.5 3.25-3.5.875 0 1.75.375 2.375.875l.5.5c.375.375.625.875.625 1.375 0 .25-.125.5-.25.75zm-8.75-8.75c-.375 0-.75.125-.875.5-.375.875.125 1.75 1 1.75.375 0 .75-.125.875-.5.375-.875-.125-1.75-1-1.75zm2.5 0c-.375 0-.75.125-.875.5-.375.875.125 1.75 1 1.75.375 0 .75-.125.875-.5.375-.875-.125-1.75-1-1.75zm-5 0c-.375 0-.75.125-.875.5C8.25 3.375 8.75 4.25 9.75 4.25c.375 0 .75-.125.875-.5.375-.875-.125-1.75-1-1.75zm4.375 20.625H.5c-.375 0-.625-.25-.625-.625s.25-.625.625-.625h21c.375 0 .625.25.625.625s-.25.625-.625.625z" />
              </svg>
            )}
            <span>Apple</span>
          </button>
        </div>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              OR EMAIL SIGNUP
            </span>
          </div>
        </div>

        {/* Email Sign Up Form */}
        <form onSubmit={handleEmailSignUp} className="space-y-4">
          <div>
            <label
              htmlFor="displayName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              FULL NAME
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                id="displayName"
                type="text"
                name="displayName"
                value={formData.displayName}
                onChange={handleInputChange}
                placeholder="John Doe"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              EMAIL ADDRESS
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="name@company.com"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              PASSWORD
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                disabled={loading}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Must be at least 6 characters
            </p>
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              CONFIRM PASSWORD
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                disabled={loading}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-900 text-white font-medium py-3 rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 mt-6"
          >
            {loading && <Loader2 className="w-5 h-5 animate-spin" />}
            Create Account
          </button>
        </form>

        {/* Sign In Link */}
        <p className="text-center text-gray-600 text-sm">
          Have an account?{" "}
          <Link
            href="/auth/signin"
            className="font-medium text-gray-900 hover:underline"
          >
            Sign In
          </Link>
        </p>

        {/* Terms */}
        <p className="text-center text-xs text-gray-500">
          By creating an account, you agree to our{" "}
          <Link href="#" className="hover:text-gray-900">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="#" className="hover:text-gray-900">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}

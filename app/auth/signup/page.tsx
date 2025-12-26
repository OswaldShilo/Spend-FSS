"use client"

import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { Mail, Lock, User, ArrowRight } from "lucide-react"

export default function SignUpPage() {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    window.location.href = "/dashboard"
  }

  return (
    <main className="min-h-screen flex bg-white font-sans overflow-hidden">
      <div className="hidden lg:flex w-[48%] p-8 relative">
        <div className="relative w-full h-full bg-black rounded-[2.5rem] overflow-hidden flex flex-col items-center justify-center border border-white/10">
          <div className="relative w-full h-full animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <Image
              src="/images/whatsapp-20image-202025-12-26-20at-2016.jpeg"
              alt="Spend-FSS Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col p-8 lg:p-16">
        <div className="flex justify-between items-center mb-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-spend-dark-bg rounded-lg flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform">
              S
            </div>
            <span className="font-bold text-xl tracking-tight text-spend-text-gray-900">Spend-FSS</span>
          </Link>
          <p className="text-sm text-spend-text-gray-500">
            Have an account?{" "}
            <Link href="/auth/signin" className="font-bold text-primary hover:text-primary/80 transition-colors ml-1">
              Sign In
            </Link>
          </p>
        </div>

        <div className="flex-1 flex flex-col justify-center max-w-[420px] mx-auto w-full">
          <div className="mb-10">
            <h1 className="text-4xl font-extrabold text-spend-text-gray-900 tracking-tight mb-3">Create account</h1>
            <p className="text-spend-text-gray-500 text-lg">Start your 14-day free trial today.</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <button className="flex items-center justify-center gap-3 py-3.5 px-4 border border-spend-neutral-200 rounded-2xl hover:bg-spend-bg-gray-50 hover:border-spend-neutral-300 transition-all text-sm font-bold text-spend-text-gray-700">
              <img src="/google-logo.png" alt="Google" className="w-5 h-5" />
              Google
            </button>
            <button className="flex items-center justify-center gap-3 py-3.5 px-4 border border-spend-neutral-200 rounded-2xl hover:bg-spend-bg-gray-50 hover:border-spend-neutral-300 transition-all text-sm font-bold text-spend-text-gray-700">
              <img src="/apple-logo-minimalist.png" alt="Apple" className="w-5 h-5" />
              Apple ID
            </button>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div className="group">
              <label className="block text-xs font-bold text-spend-text-gray-500 uppercase tracking-widest mb-2 ml-1 group-focus-within:text-primary transition-colors">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-spend-text-gray-400 group-focus-within:text-primary transition-colors" />
                </div>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="block w-full pl-11 pr-4 py-4 bg-[#F8F8F7] border-2 border-transparent rounded-2xl focus:bg-white focus:border-primary/20 focus:ring-0 text-spend-text-gray-900 placeholder:text-spend-text-gray-400 transition-all font-medium outline-none"
                  required
                />
              </div>
            </div>

            <div className="group">
              <label className="block text-xs font-bold text-spend-text-gray-500 uppercase tracking-widest mb-2 ml-1 group-focus-within:text-primary transition-colors">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-spend-text-gray-400 group-focus-within:text-primary transition-colors" />
                </div>
                <input
                  type="email"
                  placeholder="name@company.com"
                  className="block w-full pl-11 pr-4 py-4 bg-[#F8F8F7] border-2 border-transparent rounded-2xl focus:bg-white focus:border-primary/20 focus:ring-0 text-spend-text-gray-900 placeholder:text-spend-text-gray-400 transition-all font-medium outline-none"
                  required
                />
              </div>
            </div>

            <div className="group">
              <label className="block text-xs font-bold text-spend-text-gray-500 uppercase tracking-widest mb-2 ml-1 group-focus-within:text-primary transition-colors">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-spend-text-gray-400 group-focus-within:text-primary transition-colors" />
                </div>
                <input
                  type="password"
                  placeholder="••••••••••••"
                  className="block w-full pl-11 pr-4 py-4 bg-[#F8F8F7] border-2 border-transparent rounded-2xl focus:bg-white focus:border-primary/20 focus:ring-0 text-spend-text-gray-900 placeholder:text-spend-text-gray-400 transition-all font-medium outline-none"
                  required
                />
              </div>
            </div>

            <p className="text-[11px] text-spend-text-gray-400 leading-relaxed px-1">
              By creating an account, you agree to our{" "}
              <Link href="#" className="underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="#" className="underline">
                Privacy Policy
              </Link>
              .
            </p>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-4 px-4 bg-primary hover:bg-primary/90 text-white font-bold rounded-2xl transition-all mt-6 shadow-xl shadow-primary/20 hover:shadow-primary/30 active:scale-[0.98]"
            >
              Start My Journey
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}

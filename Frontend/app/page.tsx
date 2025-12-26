"use client"

import { useEffect, useState } from "react"
import { gsap } from "gsap"
import { Navbar } from "@/components/navbar"
import Link from "next/link"
import { Footer } from "@/components/footer" // Import Footer component

export default function HomePage() {
  const [showIntro, setShowIntro] = useState(true)
  const [feedback, setFeedback] = useState({ name: "", email: "", message: "" })

  useEffect(() => {
    const tl = gsap.timeline()

    tl.fromTo(
      ".intro-mark",
      { opacity: 1, scale: 0.85, rotate: -6 },
      { opacity: 1, scale: 1, rotate: 0, duration: 0.8, ease: "power2.out" },
    )
      .to({}, { duration: 1.2 })
      .to(".intro", {
        opacity: 1,
        duration: 0.6,
        ease: "power2.inOut",
        onComplete: () => setShowIntro(false),
      })

    // Subtle hero entrance animations
    gsap.from(".hero-headline", { y: 24, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.1 })
    gsap.from(".hero-sub", { y: 16, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.2 })

    gsap.from(".hero-card, .hero-chip", {
      y: 20,
      opacity: 1,
      rotate: (i: number) => (i % 2 === 0 ? -4 : 4),
      duration: 0.8,
      delay: 0.25,
      stagger: 0.08,
      ease: "power2.out",
    })
    gsap.from(".hero-dock", { y: 16, opacity: 1, duration: 0.6, delay: 0.35, ease: "power2.out" })

    // Section fade-ins
    gsap.set(".section", { opacity: 1, y: 16 })
    const reveal = () => {
      gsap.utils.toArray<HTMLElement>(".section").forEach((el, i) => {
        const rect = el.getBoundingClientRect()
        if (rect.top < window.innerHeight - 80 && el.style.opacity !== "1") {
          gsap.to(el, { opacity: 1, y: 0, duration: 0.6, delay: i * 0.05, ease: "power2.out" })
        }
      })
    }
    const onScroll = () => reveal()
    reveal()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <main className="min-h-dvh relative overflow-hidden bg-white text-spend-text-gray-900">
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-50/8 via-orange-50/5 to-amber-50/8 blur-3xl opacity-60"></div>
      </div>

      <div className="fixed inset-0 pointer-events-none opacity-5">
        <svg className="absolute top-20 left-10 w-16 h-16 text-primary" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
        </svg>
        <svg className="absolute top-40 right-20 w-12 h-12 text-primary" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" />
        </svg>
        <svg className="absolute bottom-40 left-20 w-14 h-14 text-primary" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9 11H7v6h2v-6zm4 0h-2v6h2v-6zm4 0h-2v6h2v-6zm2.5-9H19V1h-2v1H7V1H5v1H4.5C3.11 2 2 3.11 2 4.5v15C2 20.89 3.11 22 4.5 22h15c1.39 0 2.5-1.11 2.5-2.5v-15C22 3.11 20.89 2 19.5 2zM20 19.5c0 .28-.22.5-.5.5h-15c-.28 0-.5-.22-.5-.5v-15c0-.28.22-.5.5-.5h15c.28 0 .5.22.5.5v15z" />
        </svg>
        <svg className="absolute top-60 left-1/2 w-10 h-10 text-primary" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </div>

      {showIntro && (
        <div
          className="intro fixed inset-0 z-50 flex items-center justify-center bg-black text-primary"
          aria-label="Intro animation"
        >
          <div className="text-center px-6">
            <img
              src="/spend-fss-logo.jpg"
              alt="Spend FSS logo – emblem"
              className="intro-mark mx-auto h-36 md:h-44 w-auto select-none pointer-events-none"
            />
          </div>
        </div>
      )}

      <Navbar />

      {/* Hero */}
      <section
        id="hero"
        className="relative px-6 md:px-8 mx-auto max-w-6xl pt-24 md:pt-28 pb-16"
        aria-labelledby="hero-title"
      >
        <div className="text-center">
          <Link
            href="/our-mcp"
            className="inline-flex items-center gap-2 bg-white border border-primary/20 text-spend-text-gray-800 px-4 py-2 rounded-full text-sm mb-6 shadow-sm hover:bg-spend-bg-gray-50 transition-colors"
          >
            ✨ Try Our MCP
          </Link>
          <h1
            id="hero-title"
            className="hero-headline text-balance text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-black max-w-4xl mx-auto"
            style={{ color: '#000000', textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
          >
            The AI-Powered secure Expense tracker with MCP
          </h1>
          <p className="hero-sub mx-auto mt-6 max-w-2xl text-pretty text-lg text-black">
            Take control of your finances with intelligent insights and effortless tracking.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <Link
              href="/auth/signup"
              className="inline-flex items-center gap-2 text-white px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors shadow-sm bg-[rgba(142,160,138,1)]"
            >
              Get Started →
            </Link>
            <button className="inline-flex items-center gap-2 text-spend-text-gray-900 bg-white border border-border px-6 py-3 rounded-full font-medium hover:bg-spend-bg-gray-50 transition-colors shadow-sm">
              ▶ See how it works
            </button>
          </div>
        </div>

        <div className="relative mx-auto mt-16 max-w-4xl">
          <div className="relative">
            <img
              src="/spend-fss-hero-sunset.png"
              alt="Spend FSS app interface with floating feature cards showing Forex-free Debit Card, Zero brokerage US Stocks, Savings Account rewards, and wealth tracking insights"
              className="h-auto shadow-2xl mx-0 px-0 w-fit shadow-xl rounded-2xl"
            />
          </div>
        </div>
      </section>

      {/* Why It Matters */}
      <section
        id="why-it-matters"
        className="px-6 max-w-6xl mx-auto py-16 md:py-20 section"
        aria-labelledby="why-title"
      >
        <div className="text-center mb-12">
          <h2 id="why-title" className="text-3xl md:text-4xl font-bold text-balance text-spend-text-gray-900 mb-4">
            Why It Matters
          </h2>
          <p className="text-lg text-spend-text-gray-700">Your privacy is not negotiable</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Left Side - The Problem */}
          <div className="group relative rounded-2xl border-2 border-red-200 bg-gradient-to-br from-red-50 to-orange-50 p-8 shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-red-900 mb-2">The Problem</h3>
                <p className="text-sm text-red-700 font-medium">Traditional Finance Apps</p>
              </div>
            </div>
            <p className="text-spend-text-gray-800 text-lg leading-relaxed">
              Traditional Finance Apps send your bank data to the cloud. Your transaction history is stored on external
              servers, risking privacy leaks.
            </p>
            <div className="mt-6 flex items-center gap-2 text-red-600 text-sm font-medium">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Your data at risk</span>
            </div>
          </div>

          {/* Right Side - The Solution */}
          <div className="group relative rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-teal-50 to-green-50 p-8 shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-primary mb-2">The Spend FSS Solution</h3>
                <p className="text-sm text-primary font-medium">Privacy-First Architecture</p>
              </div>
            </div>
            <p className="text-spend-text-gray-800 text-lg leading-relaxed">
              Spend FSS runs Locally. Your data stays on your device. Our Model Context Protocol (MCP) ensures the AI
              only sees what it needs to answer your question—nothing else.
            </p>
            <div className="mt-6 flex items-center gap-2 text-primary text-sm font-medium">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Your data stays private</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section
        id="how-it-works"
        className="px-6 max-w-6xl mx-auto py-16 md:py-20 section bg-gradient-to-br from-teal-50/30 to-orange-50/20 rounded-3xl"
        aria-labelledby="how-it-works-title"
      >
        <div className="text-center mb-12">
          <h2
            id="how-it-works-title"
            className="text-3xl md:text-4xl font-bold text-balance text-spend-text-gray-900 mb-4"
          >
            How It Works
          </h2>
          <p className="text-lg text-spend-text-gray-700">Simple steps to financial clarity</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left - Steps */}
          <div className="space-y-6">
            <div className="flex gap-4 group">
              <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold text-spend-text-gray-900 mb-2">Connect Your Accounts</h3>
                <p className="text-spend-text-gray-700">
                  Securely link your bank accounts locally. Your data never leaves your device.
                </p>
              </div>
            </div>

            <div className="flex gap-4 group">
              <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold text-spend-text-gray-900 mb-2">AI Analyzes Locally</h3>
                <p className="text-spend-text-gray-700">
                  Our MCP intelligently categorizes and analyzes your spending patterns on your device.
                </p>
              </div>
            </div>

            <div className="flex gap-4 group">
              <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold text-spend-text-gray-900 mb-2">Get Insights</h3>
                <p className="text-spend-text-gray-700">
                  Receive personalized financial insights, budgeting tips, and spending alerts in real-time.
                </p>
              </div>
            </div>

            <div className="flex gap-4 group">
              <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform">
                4
              </div>
              <div>
                <h3 className="text-xl font-semibold text-spend-text-gray-900 mb-2">Take Control</h3>
                <p className="text-spend-text-gray-700">
                  Make informed decisions with complete visibility into your financial health, all while keeping your
                  data private.
                </p>
              </div>
            </div>
          </div>

          {/* Right - Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="/finance-bro.png"
                alt="How Spend FSS works - Person managing financial growth with charts"
                className="w-full h-auto"
              />
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-orange-500/20 rounded-full blur-2xl"></div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="px-6 max-w-5xl mx-auto py-16 section md:py-1.5 md:px-0"
        aria-labelledby="features-title"
      >
        <div className="text-center mb-12">
          <h2 id="features-title" className="text-3xl md:text-4xl font-bold text-balance text-spend-text-gray-900 mb-4">
            Features
          </h2>
          <p className="text-lg text-spend-text-gray-700">Powerful tools to transform your financial management</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="group relative rounded-2xl border border-primary/20 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 11H7v6h2v-6zm4 0h-2v6h2v-6zm4 0h-2v6h2v-6zm2.5-9H19V1h-2v1H7V1H5v1H4.5C3.11 2 2 3.11 2 4.5v15C2 20.89 3.11 22 4.5 22h15c1.39 0 2.5-1.11 2.5-2.5v-15C22 3.11 20.89 2 19.5 2zM20 19.5c0 .28-.22.5-.5.5h-15c-.28 0-.5-.22-.5-.5v-15c0-.28.22-.5.5-.5h15c.28 0 .5.22.5.5v15z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-spend-text-gray-900 mb-2">Intelligent Tracking</h3>
                <p className="text-spend-text-gray-700 leading-relaxed">
                  Automatically categorize transactions and monitor your daily, weekly, and monthly spending in
                  real-time.
                </p>
              </div>
            </div>
          </div>

          <div className="group relative rounded-2xl border border-primary/20 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-spend-text-gray-900 mb-2">Insightful Analytics</h3>
                <p className="text-spend-text-gray-700 leading-relaxed">
                  Go beyond simple charts. Understand your financial habits with AI-driven reports and predictive
                  insights that reveal patterns in your spending.
                </p>
              </div>
            </div>
          </div>

          <div className="group relative rounded-2xl border border-primary/20 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-spend-text-gray-900 mb-2">Fortified Security</h3>
                <p className="text-spend-text-gray-700 leading-relaxed">
                  Your data is protected by our secure MCP architecture, ensuring your financial information remains
                  private and protected. Always.
                </p>
              </div>
            </div>
          </div>

          <div className="group relative rounded-2xl border border-primary/20 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-spend-text-gray-900 mb-2">Proactive Budgeting</h3>
                <p className="text-spend-text-gray-700 leading-relaxed">
                  Set smart budgets that adapt to your lifestyle. Receive proactive alerts and recommendations to help
                  you stay on track and reach your savings goals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feedback Section */}
      <section
        id="feedback"
        className="px-6 max-w-4xl mx-auto py-16 md:py-20 section"
        aria-labelledby="feedback-title"
      >
        <div className="relative rounded-3xl bg-gradient-to-br from-primary/5 to-orange-500/5 border-2 border-primary/20 p-8 md:p-12 shadow-lg">
          <div className="text-center mb-8">
            <h2 id="feedback-title" className="text-3xl md:text-4xl font-bold text-spend-text-gray-900 mb-4">
              We'd Love Your Feedback
            </h2>
            <p className="text-lg text-spend-text-gray-700">
              Help us improve Spend FSS. Share your thoughts and suggestions with us.
            </p>
          </div>

          <form className="max-w-lg mx-auto space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-spend-text-gray-900 mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-xl border border-border bg-white text-spend-text-gray-900 placeholder:text-spend-text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-spend-text-gray-900 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="john@example.com"
                className="w-full px-4 py-3 rounded-xl border border-border bg-white text-spend-text-gray-900 placeholder:text-spend-text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                required
              />
            </div>

            <div>
              <label htmlFor="feedback" className="block text-sm font-medium text-spend-text-gray-900 mb-2">
                Your Feedback
              </label>
              <textarea
                id="feedback"
                name="feedback"
                rows={5}
                placeholder="Tell us what you think..."
                className="w-full px-4 py-3 rounded-xl border border-border bg-white text-spend-text-gray-900 placeholder:text-spend-text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white px-6 py-4 rounded-xl font-semibold hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all transform hover:scale-105 shadow-lg"
            >
              Submit Feedback
            </button>
          </form>

          <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl"></div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  )
}

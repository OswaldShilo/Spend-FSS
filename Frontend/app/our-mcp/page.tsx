"use client"

import { useEffect } from "react"
import { gsap } from "gsap"
import { Navbar } from "@/components/navbar"
import Link from "next/link"

export default function OurMCPPage() {
  useEffect(() => {
    // Page entrance animations
    gsap.from(".page-title", { y: 24, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.1 })
    gsap.from(".page-subtitle", { y: 16, opacity: 1, duration: 0.7, ease: "power2.out", delay: 0.2 })

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
    <main className="min-h-dvh relative overflow-hidden bg-white">
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

      <Navbar />

      {/* Hero Section */}
      <section className="relative px-6 md:px-8 mx-auto max-w-4xl pt-24 md:pt-28 pb-16" aria-labelledby="mcp-title">
        <div className="text-center">
          <h1
            id="mcp-title"
            className="page-title text-balance text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-spend-text-gray-900 max-w-4xl mx-auto"
          >
            Our Multi-agent Controller Platform
          </h1>
          <p className="page-subtitle mx-auto mt-6 max-w-2xl text-pretty text-lg text-spend-text-gray-700">
            Discover the principles and technology that power Spend FSS's intelligent financial management system.
          </p>
        </div>
      </section>

      {/* Our Principles Section */}
      <section className="px-6 md:px-8 max-w-4xl mx-auto pb-16 md:pb-20 section" aria-labelledby="principles-title">
        <div className="relative rounded-2xl bg-gradient-to-br from-primary to-primary/90 text-white shadow-xl p-8 md:p-12 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>

          <div className="relative">
            <h2 id="principles-title" className="text-3xl md:text-4xl font-bold text-balance mb-8">
              Our Principles
            </h2>
            <div className="grid gap-6 md:gap-8">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Mission</h3>
                  <p className="text-white/90 leading-relaxed">
                    To empower individuals with the financial clarity needed to achieve their goals.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Commitment</h3>
                  <p className="text-white/90 leading-relaxed">
                    To provide a seamless, secure, and insightful expense tracking experience.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Promise</h3>
                  <p className="text-white/90 leading-relaxed">Your money, your data — always safe, always yours.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MCP Technology Section */}
      <section className="px-6 md:px-8 max-w-5xl mx-auto py-16 md:py-20 section" aria-labelledby="technology-title">
        <div className="text-center mb-12">
          <h2
            id="technology-title"
            className="text-3xl md:text-4xl font-bold text-balance text-spend-text-gray-900 mb-4"
          >
            MCP Technology
          </h2>
          <p className="text-lg text-spend-text-gray-700">
            Advanced AI-driven financial intelligence at your fingertips
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="group relative rounded-2xl border border-primary/20 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-spend-text-gray-900 mb-2">Multi-Agent Architecture</h3>
                <p className="text-spend-text-gray-700 leading-relaxed">
                  Our MCP uses specialized AI agents that work together to analyze, categorize, and provide insights on
                  your financial data with unprecedented accuracy.
                </p>
              </div>
            </div>
          </div>

          <div className="group relative rounded-2xl border border-primary/20 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-spend-text-gray-900 mb-2">Secure Processing</h3>
                <p className="text-spend-text-gray-700 leading-relaxed">
                  All data processing happens within our secure MCP environment, ensuring your financial information
                  never leaves our protected infrastructure.
                </p>
              </div>
            </div>
          </div>

          <div className="group relative rounded-2xl border border-primary/20 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-spend-text-gray-900 mb-2">Predictive Analytics</h3>
                <p className="text-spend-text-gray-700 leading-relaxed">
                  Our MCP learns from your spending patterns to provide predictive insights and personalized
                  recommendations for better financial decisions.
                </p>
              </div>
            </div>
          </div>

          <div className="group relative rounded-2xl border border-primary/20 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 11H7v6h2v-6zm4 0h-2v6h2v-6zm4 0h-2v6h2v-6zm2.5-9H19V1h-2v1H7V1H5v1H4.5C3.11 2 2 3.11 2 4.5v15C2 20.89 3.11 22 4.5 22h15c1.39 0 2.5-1.11 2.5-2.5v-15C22 3.11 20.89 2 19.5 2zM20 19.5c0 .28-.22.5-.5.5h-15c-.28 0-.5-.22-.5-.5v-15c0-.28.22-.5.5-.5h15c.28 0 .5.22.5.5v15z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-spend-text-gray-900 mb-2">Real-time Processing</h3>
                <p className="text-spend-text-gray-700 leading-relaxed">
                  Experience instant transaction categorization and analysis as our MCP processes your financial data in
                  real-time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 md:px-8 max-w-4xl mx-auto pb-16 md:pb-20 section">
        <div className="text-center bg-spend-bg-gray-50 rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-balance text-spend-text-gray-900 mb-4">
            Ready to Experience MCP?
          </h2>
          <p className="text-lg text-spend-text-gray-700 mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust our Multi-agent Controller Platform to manage their finances intelligently
            and securely.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/auth/signin"
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors shadow-sm"
            >
              Get Started →
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-spend-text-gray-900 bg-white border border-border px-6 py-3 rounded-full font-medium hover:bg-spend-bg-gray-50 transition-colors shadow-sm"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-4">About Spend FSS</h3>
            <p className="text-white/80 max-w-3xl mx-auto leading-relaxed">
              Spend FSS revolutionizes financial management by providing secure, intelligent expense tracking and pay
              access solutions. Our platform empowers teams and individuals to make smarter financial decisions with
              real-time insights, automated tracking, and seamless integration across all your financial needs.
            </p>
            <div className="flex items-center justify-center gap-6 mt-8 pt-8 border-t border-white/20">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors"
                aria-label="Follow us on LinkedIn"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors"
                aria-label="Star us on GitHub"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}

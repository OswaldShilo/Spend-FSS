"use client"

import { useEffect } from "react"
import { gsap } from "gsap"
import { Navbar } from "@/components/navbar"
import Link from "next/link"

export default function AboutPage() {
  useEffect(() => {
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

      <Navbar />

      {/* Hero Section */}
      <section
        className="relative px-6 md:px-8 mx-auto max-w-6xl pt-24 md:pt-28 pb-16"
        aria-labelledby="about-hero-title"
      >
        <div className="text-center">
          <h1
            id="about-hero-title"
            className="text-balance text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-black max-w-4xl mx-auto"
          >
            About Spend-FSS
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-black">
            Revolutionizing personal finance with intelligent, secure expense tracking
          </p>
        </div>
      </section>

      {/* Main About Content */}
      <section className="px-6 md:px-8 max-w-4xl mx-auto py-16 md:py-20 section" aria-labelledby="about-content-title">
        <div className="relative rounded-2xl border border-primary/20 bg-gradient-to-br from-white to-gray-50/50 shadow-lg p-8 md:p-12">
          <div className="absolute top-4 right-4 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </div>
          <h2
            id="about-content-title"
            className="text-3xl md:text-4xl font-bold text-balance text-spend-text-gray-900 mb-6"
          >
            Our Mission
          </h2>
          <p className="text-lg leading-relaxed text-spend-text-gray-700 mb-6">
            Spend-FSS revolutionizes personal finance. We go beyond simple logging by using our secure, AI-driven
            Multi-agent Controller Platform (MCP) to intelligently analyze and categorize your spending. Our platform
            provides you with a crystal-clear understanding of your financial habits, empowering you to make smarter
            decisions with confidence and ease.
          </p>
          <p className="text-lg leading-relaxed text-spend-text-gray-700">
            Spend FSS revolutionizes financial management by providing secure, intelligent expense tracking and pay
            access solutions. Our platform empowers teams and individuals to make smarter financial decisions with
            real-time insights, automated tracking, and seamless integration across all your financial needs.
          </p>
        </div>
      </section>

      {/* Core Values */}
      <section className="px-6 md:px-8 max-w-5xl mx-auto py-16 md:py-20 section" aria-labelledby="values-title">
        <div className="text-center mb-12">
          <h2 id="values-title" className="text-3xl md:text-4xl font-bold text-balance text-spend-text-gray-900 mb-4">
            Our Core Values
          </h2>
          <p className="text-lg text-spend-text-gray-700">What drives us forward</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="group relative rounded-2xl border border-primary/20 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 mb-4">
              <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-spend-text-gray-900 mb-2">Security First</h3>
            <p className="text-spend-text-gray-700 leading-relaxed">
              Your financial data is protected by our secure MCP architecture, ensuring privacy and protection always.
            </p>
          </div>

          <div className="group relative rounded-2xl border border-primary/20 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 mb-4">
              <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-spend-text-gray-900 mb-2">Intelligent Insights</h3>
            <p className="text-spend-text-gray-700 leading-relaxed">
              AI-driven analytics reveal spending patterns and provide actionable recommendations for better financial
              decisions.
            </p>
          </div>

          <div className="group relative rounded-2xl border border-primary/20 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 mb-4">
              <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 11H7v6h2v-6zm4 0h-2v6h2v-6zm4 0h-2v6h2v-6zm2.5-9H19V1h-2v1H7V1H5v1H4.5C3.11 2 2 3.11 2 4.5v15C2 20.89 3.11 22 4.5 22h15c1.39 0 2.5-1.11 2.5-2.5v-15C22 3.11 20.89 2 19.5 2zM20 19.5c0 .28-.22.5-.5.5h-15c-.28 0-.5-.22-.5-.5v-15c0-.28.22-.5.5-.5h15c.28 0 .5.22.5.5v15z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-spend-text-gray-900 mb-2">Effortless Tracking</h3>
            <p className="text-spend-text-gray-700 leading-relaxed">
              Automatic categorization and real-time monitoring make managing your finances simple and intuitive.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 md:px-8 max-w-4xl mx-auto py-16 md:py-20 section">
        <div className="relative rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/10 to-orange-500/10 p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-spend-text-gray-900 mb-4">
            Ready to Transform Your Finances?
          </h2>
          <p className="text-lg text-spend-text-gray-700 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are taking control of their financial future with Spend-FSS.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/auth/signup"
              className="inline-flex items-center gap-2 text-white px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors shadow-sm bg-[rgba(142,160,138,1)]"
            >
              Get Started →
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-spend-text-gray-900 bg-white border border-border px-6 py-3 rounded-full font-medium hover:bg-spend-bg-gray-50 transition-colors shadow-sm"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>

      <footer className="relative bg-black text-white py-16 md:py-20 mt-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-6xl mx-auto px-6 md:px-8">
          <div className="text-center mb-12">
            <img
              src="/spend-fss-logo.jpg"
              alt="Spend FSS logo"
              className="mx-auto h-24 hover:scale-105 transition-transform duration-300 mb-0 leading-7 md:h-32 w-auto"
            />
          </div>

          <div className="flex items-center justify-center gap-8 pt-12 border-t border-white/20">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group text-white/70 hover:text-white transition-all duration-300 transform hover:scale-125"
              aria-label="Follow us on LinkedIn"
            >
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group text-white/70 hover:text-white transition-all duration-300 transform hover:scale-125"
              aria-label="Star us on GitHub"
            >
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            </a>
          </div>

          <div className="text-center mt-12 pt-8 border-t border-white/20">
            <p className="text-white/60 text-sm">© 2025 Spend FSS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}

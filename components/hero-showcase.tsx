"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { CreditCard, LineChart, PiggyBank, ShieldCheck, Wallet, Banknote } from "lucide-react"
import { FeatureCard } from "./feature-card"

export default function HeroShowcase() {
  const rootRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!rootRef.current) return
    const ctx = gsap.context(() => {
      gsap.from(".hero-headline", {
        y: 24,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
      })
      gsap.from(".hero-sub", {
        y: 16,
        opacity: 1,
        duration: 0.7,
        delay: 0.1,
        ease: "power2.out",
      })
      gsap.from(".hero-card, .hero-chip", {
        y: 20,
        opacity: 1,
        rotate: (i) => (i % 2 === 0 ? -4 : 4),
        duration: 0.8,
        delay: 0.15,
        stagger: 0.08,
        ease: "power2.out",
      })
      gsap.from(".hero-dock", {
        y: 16,
        opacity: 1,
        duration: 0.6,
        delay: 0.25,
        ease: "power2.out",
      })
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} className="relative isolate bg-[#040403] text-white" aria-labelledby="hero-heading">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
      <div className="mx-auto max-w-6xl px-4 pt-24 pb-16 sm:pt-28 sm:pb-20">
        {/* Floating navbar style container */}
        <div className="fixed left-1/2 top-4 z-50 w-full -translate-x-1/2 px-4">
          <nav className="mx-auto max-w-5xl rounded-full border border-white/10 bg-black/40 px-4 py-2 backdrop-blur">
            <div className="flex items-center justify-between">
              <div className="font-semibold text-white">Spend FSS</div>
              <div className="hidden gap-6 text-sm text-white/80 sm:flex">
                <a href="#features" className="hover:text-white">
                  Features
                </a>
                <a href="#mcp" className="hover:text-white">
                  MCP
                </a>
                <a href="#built" className="hover:text-white">
                  Built with
                </a>
              </div>
              <a
                href="#cta"
                className="rounded-full bg-[#5B7553] px-4 py-2 text-sm font-medium text-black hover:opacity-90"
              >
                Get Started
              </a>
            </div>
          </nav>
        </div>

        {/* Headline */}
        <div className="text-center">
          <h1
            id="hero-heading"
            className="hero-headline text-balance text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl"
          >
            One app for all things <span className="text-[#5B7553]">money</span>
          </h1>
          <p className="hero-sub mx-auto mt-4 max-w-2xl text-pretty text-white/70">
            Track expenses, grow savings, and make smarter moves with clear insights.
          </p>
        </div>

        {/* Showcase */}
        <div className="relative mx-auto mt-10 grid max-w-5xl place-items-center">
          {/* Center "phone" frame */}
          <div
            className="hero-card relative aspect-[3/5] w-64 rounded-[28px] border border-[#5B7553] bg-black/60 shadow-[0_0_0_1px_rgba(91,117,83,0.35),0_20px_60px_rgba(0,0,0,0.55)] sm:w-72 md:w-80"
            aria-label="App preview frame"
          >
            {/* Minimal top stub UI */}
            <div className="flex items-center justify-between px-4 py-3 text-white/60">
              <div className="h-2 w-16 rounded-full bg-white/15" />
              <div className="flex gap-2">
                <div className="h-2 w-2 rounded-full bg-white/20" />
                <div className="h-2 w-2 rounded-full bg-white/20" />
                <div className="h-2 w-2 rounded-full bg-white/20" />
              </div>
            </div>

            {/* Dock */}
            <div className="hero-dock absolute inset-x-6 bottom-5 rounded-2xl border border-white/10 bg-black/50 p-2 text-white/80 backdrop-blur">
              <div className="grid grid-cols-5 gap-2 text-center text-[12px] leading-4 sm:text-xs">
                <DockItem icon={<Wallet size={18} />} label="Track" />
                <DockItem icon={<Banknote size={18} />} label="Loans" />
                <DockItem icon={<CreditCard size={18} />} label="Pay" />
                <DockItem icon={<LineChart size={18} />} label="Invest" />
                <DockItem icon={<PiggyBank size={18} />} label="Cards" />
              </div>
            </div>
          </div>

          {/* Floating feature chips (left/right) */}
          <div className="pointer-events-none absolute -left-6 top-16 hidden rotate-[-6deg] sm:block md:-left-10">
            <FeatureCard
              className="hero-chip"
              icon={<ShieldCheck className="h-5 w-5" />}
              title="Forex-free spends"
              subtitle="Save more on every swipe"
            />
          </div>
          <div className="pointer-events-none absolute -left-10 bottom-20 hidden rotate-[6deg] sm:block">
            <FeatureCard
              className="hero-chip"
              icon={<LineChart className="h-5 w-5" />}
              title="30+ insights"
              subtitle="Spot trends instantly"
            />
          </div>
          <div className="pointer-events-none absolute -right-6 top-10 hidden rotate-[5deg] sm:block md:-right-10">
            <FeatureCard
              className="hero-chip"
              icon={<PiggyBank className="h-5 w-5" />}
              title="Rewarding savings"
              subtitle="Grow, safely"
            />
          </div>
          <div className="pointer-events-none absolute -right-10 bottom-24 hidden rotate-[-6deg] sm:block">
            <FeatureCard
              className="hero-chip"
              icon={<CreditCard className="h-5 w-5" />}
              title="Smart cards"
              subtitle="Controls that work"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function DockItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-xl px-2 py-1 text-white/80">
      <div className="rounded-xl bg-white/[0.03] p-1.5">{icon}</div>
      <span className="text-[11px] sm:text-xs">{label}</span>
    </div>
  )
}

"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"

export function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const navRef = useRef<HTMLDivElement | null>(null)

  // Track and persist position
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null)
  const posKey = "spend-fss-navbar-pos"

  useEffect(() => {
    // Entrance
    gsap.fromTo(".navbar", { y: -20, opacity: 1 }, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" })

    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)

    // Restore position or center
    const saved = typeof window !== "undefined" ? localStorage.getItem(posKey) : null
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as { x: number; y: number }
        setPos(parsed)
      } catch {
        // ignore parse errors
      }
    } else {
      // Center based on measured width
      const centerNow = () => {
        const el = navRef.current
        if (!el) return
        const rect = el.getBoundingClientRect()
        const cx = Math.max(8, (window.innerWidth - rect.width) / 2)
        const cy = 16 // ~ top-4
        setPos({ x: cx, y: cy })
      }
      // Wait a tick for layout
      requestAnimationFrame(centerNow)
      window.addEventListener("resize", centerNow, { passive: true })
      return () => {
        window.removeEventListener("resize", centerNow)
        window.removeEventListener("scroll", handleScroll)
      }
    }

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Dragging
  useEffect(() => {
    const el = navRef.current
    if (!el) return

    let dragging = false
    let startX = 0
    let startY = 0
    let baseX = 0
    let baseY = 0

    const clamp = (x: number, y: number) => {
      const rect = el.getBoundingClientRect()
      const maxX = Math.max(0, window.innerWidth - rect.width - 8)
      const maxY = Math.max(0, window.innerHeight - rect.height - 8)
      return {
        x: Math.min(Math.max(8, x), maxX),
        y: Math.min(Math.max(8, y), maxY),
      }
    }

    const onPointerDown = (e: PointerEvent) => {
      // Don't drag when interacting with links or buttons
      const target = e.target as HTMLElement
      if (target.closest("a, button, input, [role='button']")) return
      dragging = true
      el.setPointerCapture(e.pointerId)
      startX = e.clientX
      startY = e.clientY
      baseX = pos?.x ?? 16
      baseY = pos?.y ?? 16
      e.preventDefault()
    }

    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return
      const next = clamp(baseX + (e.clientX - startX), baseY + (e.clientY - startY))
      setPos(next)
    }

    const onPointerUp = (e: PointerEvent) => {
      if (!dragging) return
      dragging = false
      el.releasePointerCapture(e.pointerId)
      if (pos) {
        localStorage.setItem(posKey, JSON.stringify(pos))
      }
    }

    el.addEventListener("pointerdown", onPointerDown)
    window.addEventListener("pointermove", onPointerMove)
    window.addEventListener("pointerup", onPointerUp)
    return () => {
      el.removeEventListener("pointerdown", onPointerDown)
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("pointerup", onPointerUp)
    }
  }, [pos])

  return (
    <header
      ref={navRef}
      className="navbar fixed z-40 transition-all duration-300 cursor-grab active:cursor-grabbing"
      role="banner"
      style={{
        top: pos ? `${pos.y}px` : undefined,
        left: pos ? `${pos.x}px` : undefined,
        transform: `scale(${scrolled ? 0.95 : 1})`,
      }}
    >
      {!pos && <div className="fixed top-4 left-1/2 -translate-x-1/2" aria-hidden />}

      <nav
        className="bg-white/95 backdrop-blur-md border border-border rounded-full px-6 shadow-lg py-3"
        aria-label="Primary"
      >
        <div className="flex items-center justify-between gap-8">
          <Link href="/" className="flex items-center gap-2 font-semibold text-spend-text-gray-900">
            <div className="w-2 h-2 bg-primary rounded-full" />
            Spend FSS
          </Link>

          {/* <CHANGE> Removed Dashboard and Features, kept only About, Our Team, Our MCP */}
          <div className="hidden sm:grid grid-cols-[1fr_auto_1fr] items-center gap-4">
            <div aria-hidden />
            <div className="flex items-center justify-center gap-8">
              <a
                href="/about"
                className="text-spend-text-gray-700 hover:text-spend-text-gray-900 transition-colors text-sm font-medium"
              >
                About
              </a>
              <Link
                href="/our-team"
                className="text-spend-text-gray-700 hover:text-spend-text-gray-900 transition-colors text-sm font-medium"
              >
                Our Team
              </Link>
              <Link
                href="/our-mcp"
                className="text-spend-text-gray-700 hover:text-spend-text-gray-900 transition-colors text-sm font-medium"
              >
                Our MCP
              </Link>
            </div>
            <div aria-hidden />
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/auth/signin"
              className="rounded-full text-white px-4 py-2 text-sm font-medium hover:bg-spend-bg-gray-800 transition-colors bg-[rgba(142,160,138,1)]"
            >
              Sign In
            </Link>
            <Link
              href="/auth/signup"
              className="rounded-full bg-white text-black border border-border px-4 py-2 text-sm font-medium hover:bg-spend-bg-gray-50 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}

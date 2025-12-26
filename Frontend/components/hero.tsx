"use client"

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

export function DockItem({
  icon,
  label,
  className,
}: {
  icon: ReactNode
  label: string
  className?: string
}) {
  return (
    <div className={cn("flex flex-col items-center gap-1 rounded-xl px-2 py-1 text-white/85", className)}>
      <div className="rounded-xl bg-white/[0.06] p-1.5">{icon}</div>
      <span className="text-[11px] sm:text-xs">{label}</span>
    </div>
  )
}

export function HeroChip({
  icon,
  title,
  subtitle,
  className,
}: {
  icon: ReactNode
  title: string
  subtitle: string
  className?: string
}) {
  return (
    <div
      className={cn(
        /* Replaced hardcoded colors with semantic tokens */
        "pointer-events-none select-none rounded-2xl border border-primary/45 bg-spend-dark-bg/85",
        "px-4 py-3 text-white shadow-[0_0_0_1px_rgba(91,117,83,0.25),0_14px_40px_rgba(0,0,0,0.45)] backdrop-blur",
        className,
      )}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 text-primary">{icon}</div>
        <div>
          <p className="text-sm font-semibold leading-5">{title}</p>
          <p className="text-xs leading-5 text-white/70">{subtitle}</p>
        </div>
      </div>
    </div>
  )
}

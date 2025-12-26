"use client"

import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

export function FeatureCard({
  className,
  icon,
  title,
  subtitle,
}: {
  className?: string
  icon: ReactNode
  title: string
  subtitle: string
}) {
  return (
    <div
      className={cn(
        /* Replaced hardcoded colors with semantic tokens */
        "pointer-events-none select-none rounded-2xl border border-primary/40 bg-spend-dark-bg/80 px-4 py-3 shadow-[0_0_0_1px_rgba(91,117,83,0.25),0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur",
        "text-white",
        className,
      )}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 text-primary">{icon}</div>
        <div>
          <p className="text-sm font-semibold leading-5 text-white">{title}</p>
          <p className="text-xs leading-5 text-white/70">{subtitle}</p>
        </div>
      </div>
    </div>
  )
}

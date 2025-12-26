import type React from "react"
import { cn } from "@/lib/utils"

export function TechBadge({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        /* Replaced hardcoded colors with semantic tokens */
        "inline-flex items-center gap-2 rounded-full border border-primary/50 bg-spend-dark-bg px-3 py-1.5 text-sm text-white",
        className,
      )}
    >
      {children}
    </span>
  )
}

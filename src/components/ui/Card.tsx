"use client";
import { useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

/** Premium surface: hairline border, grain, and an orange spotlight that follows the cursor. */
export default function Card({ className, children, flat, href, as: Tag = "div", ...p }: React.HTMLAttributes<HTMLElement> & { flat?: boolean; href?: string; as?: "div" | "article" | "li" }) {
  const ref = useRef<HTMLElement>(null);
  const move = (e: React.MouseEvent<HTMLElement>) => {
    const r = ref.current?.getBoundingClientRect(); if (!r) return;
    ref.current!.style.setProperty("--mx", `${e.clientX - r.left}px`);
    ref.current!.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  const T = (href ? Link : Tag) as React.ElementType;
  if (href) (p as Record<string, unknown>).href = href;
  return <T ref={ref} onMouseMove={move} className={cn("kx-card", flat && "kx-card--flat", className)} {...p}>{children}</T>;
}

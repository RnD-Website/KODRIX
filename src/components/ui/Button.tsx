"use client";
import { cn } from "@/lib/utils";
import { track } from "@/lib/analytics";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: "primary" | "ghost" | "light"; href?: string; event?: string;
};

export default function Button({ variant = "primary", href, event, className, children, onClick, ...rest }: Props) {
  const base = "inline-flex items-center justify-center gap-2 select-none whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-2";
  const styles = {
    primary: "btn-primary h-[42px] px-5",
    ghost: "h-[42px] rounded-lg px-4 font-mono text-[11px] uppercase tracking-[0.06em] text-fg/80 transition hover:bg-white/5 hover:text-fg",
    light: "h-9 rounded-md bg-white px-4 text-[13px] font-medium text-black transition hover:bg-white/90 active:scale-[.97]",
  }[variant];
  const handle = (e: React.MouseEvent<never>) => { if (event) track(event); (onClick as ((e: unknown) => void) | undefined)?.(e); };
  if (href) return <a href={href} className={cn(base, styles, className)} onClick={handle as never} {...(rest as object)}>{children}</a>;
  return <button className={cn(base, styles, className)} onClick={handle as never} {...(rest as object)}>{children}</button>;
}

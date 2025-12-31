import Link from "next/link";
import { cn } from "./utils";

export function Container({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)} {...props} />;
}

export function Button({
  className,
  variant = "primary",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "ghost" }) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition active:scale-[0.99] disabled:opacity-60";
  const styles =
    variant === "primary"
      ? "bg-black text-white hover:bg-black/90"
      : variant === "secondary"
        ? "bg-white text-black ring-1 ring-black/10 hover:bg-zinc-50"
        : "bg-transparent text-black hover:bg-black/5";
  return <button className={cn(base, styles, className)} {...props} />;
}

export function A({
  className,
  ...props
}: React.ComponentProps<typeof Link> & { className?: string }) {
  return <Link className={cn("text-sm text-black/80 hover:text-black", className)} {...props} />;
}


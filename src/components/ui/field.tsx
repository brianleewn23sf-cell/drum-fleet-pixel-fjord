import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function FieldLabel({ className, ...props }: ComponentProps<"label">) {
  return (
    <label
      className={cn(
        "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted",
        className,
      )}
      {...props}
    />
  );
}

const controlClass =
  "h-11 w-full rounded-md border border-border bg-bg px-3 text-sm text-fg outline-none transition-colors duration-150 placeholder:text-subtle focus:border-border-strong focus:ring-2 focus:ring-accent/50";

export function FieldInput({ className, ...props }: ComponentProps<"input">) {
  return <input className={cn(controlClass, className)} {...props} />;
}

export function FieldSelect({
  className,
  children,
  ...props
}: ComponentProps<"select">) {
  return (
    <select className={cn(controlClass, "appearance-none pr-8", className)} {...props}>
      {children}
    </select>
  );
}

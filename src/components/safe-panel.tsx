"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";

export class SafePanel extends Component<
  { children: ReactNode; label?: string },
  { err: Error | null }
> {
  state = { err: null as Error | null };

  static getDerivedStateFromError(err: Error) {
    return { err };
  }

  componentDidCatch(err: Error, info: ErrorInfo) {
    console.error(this.props.label || "panel", err, info);
  }

  render() {
    if (this.state.err) {
      return (
        <div className="rounded-xl border border-border bg-surface p-4">
          <p className="font-display text-lg font-bold uppercase">Couldn’t load this bit</p>
          <p className="mt-2 text-sm leading-7 text-muted">
            {this.state.err.message || "Unexpected error."} Tap Reload, then open Pitch again.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

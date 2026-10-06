"use client";

import { useEffect } from "react";
import { heartbeatParent, parentSessionId } from "@/lib/parent-presence";

export function useParentPresence(child: string, page: string) {
  useEffect(() => {
    const sid = parentSessionId();
    if (!sid) return;
    const beat = () => {
      void heartbeatParent({ data: { sid, child: child || "", page } });
    };
    beat();
    const t = setInterval(beat, 8000);
    return () => clearInterval(t);
  }, [child, page]);
}

import { createFileRoute } from "@tanstack/react-router";
import { ParentPerf } from "@/components/parent-perf";

export const Route = createFileRoute("/perf")({ component: ParentPerf });

import { createFileRoute } from "@tanstack/react-router";
import { ParentBoard } from "@/components/parent-board";

export const Route = createFileRoute("/board")({ component: BoardPage });

function BoardPage() {
  return <ParentBoard />;
}

import { createFileRoute } from "@tanstack/react-router";
import { VotingApp } from "@/components/voting-app";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <VotingApp />;
}

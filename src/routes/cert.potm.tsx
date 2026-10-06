import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PotmCertificate } from "@/components/potm-certificate";
import { getPotm } from "@/lib/potm-actions";
import { upcomingPotmMonth } from "@/lib/potm";

export const Route = createFileRoute("/cert/potm")({
  validateSearch: (search: Record<string, unknown>) => ({
    month: typeof search.month === "string" ? search.month : "",
    player: typeof search.player === "string" ? search.player : "",
  }),
  component: CertPage,
});

function CertPage() {
  const { month: monthQ, player: playerQ } = Route.useSearch();
  const month = /^\d{4}-\d{2}$/.test(monthQ) ? monthQ : upcomingPotmMonth();
  const [ready, setReady] = useState(false);
  const [player, setPlayer] = useState(playerQ);
  const [parentPts, setParentPts] = useState(0);
  const [trainingPts, setTrainingPts] = useState(0);
  const [oppMom, setOppMom] = useState(0);
  const [playersPlayer, setPlayersPlayer] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    void getPotm({ data: { month } })
      .then((data) => {
        const row =
          data.standings.find((s) => s.name === playerQ) ||
          (data.winner && data.standings.find((s) => s.name === data.winner?.player)) ||
          data.leader;
        if (playerQ) setPlayer(playerQ);
        else if (row) setPlayer(row.name);
        if (row && (!playerQ || row.name === playerQ)) {
          setParentPts(row.parentPts);
          setTrainingPts(row.trainingPts);
          setOppMom(row.oppMom);
          setPlayersPlayer(row.playersPlayer);
          setTotal(row.total);
        } else if (playerQ) {
          setParentPts(21);
          setTrainingPts(78);
          setOppMom(1);
          setPlayersPlayer(1);
          setTotal(21 + 78 + 20 + 10);
        }
        setReady(true);
      })
      .catch(() => setReady(true));
  }, [month, playerQ]);

  if (!ready) {
    return (
      <main className="flex min-h-dvh items-center justify-center bg-[#f3efe6] text-[#0c0c0d]">
        <p className="text-sm">Loading certificate…</p>
      </main>
    );
  }

  if (!player) {
    return (
      <main className="flex min-h-dvh flex-col items-center justify-center gap-2 bg-[#f3efe6] px-6 text-center text-[#0c0c0d]">
        <p className="font-display text-2xl font-bold uppercase">No winner yet</p>
        <p className="text-sm text-[#6b6760]">
          Points land from 3-2-1, training, opposition MOM and players’ player.
        </p>
      </main>
    );
  }

  return (
    <PotmCertificate
      month={month}
      player={player}
      parentPts={parentPts}
      trainingPts={trainingPts}
      oppMom={oppMom}
      playersPlayer={playersPlayer}
      total={total}
    />
  );
}

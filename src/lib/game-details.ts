export type GameDetail = {
  title: string;
  lines: string[];
};

const NOTES: { match: string; title: string; lines: string[] }[] = [
  {
    match: "pine villa",
    title: "Game details · Pine Villa",
    lines: [
      "If their keeper has the ball in his hands, it is going long.",
      "Drop back straight away.",
      "Win the first ball. If that fails, win the second ball.",
    ],
  },
];

export function gameDetailsFor(opposition: string): GameDetail | null {
  const key = opposition.toLowerCase();
  return NOTES.find((n) => key.includes(n.match)) ?? null;
}

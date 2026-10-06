import { SCORING } from "@/lib/scoring";

export function ScoringKey() {
  return (
    <ul className="mt-2 text-xs text-muted">
      <li>Parents 3 / 2 / 1</li>
      <li>Opp MOM {SCORING.oppMom} · players’ player {SCORING.playersPlayer}</li>
      <li>Training max {SCORING.trainingMax} (attendance, effort, attitude, achievement /10)</li>
      <li>Lose training marks: not turning up, booting balls when Brian is talking, messing about, swearing</li>
      <li>Achievement is a strict perfect mark — to get the best out of them</li>
      <li>Tests: time and technique /10. More drills will be added — practise now</li>
    </ul>
  );
}
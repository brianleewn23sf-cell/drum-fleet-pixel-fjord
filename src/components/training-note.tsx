import { TRAINING_NIGHT, TRAINING_VENUE } from "@/lib/brand";
import { TRAINING_MARKS_INTRO, TRAINING_MARKS_LOSE } from "@/lib/youth-rules";
import { cn } from "@/lib/utils";

export function TrainingNote({ className }: { className?: string }) {
  return (
    <div className={cn("text-sm text-muted", className)}>
      <p>
        <span className="font-semibold text-fg">Training</span>
        {` · ${TRAINING_NIGHT} · ${TRAINING_VENUE}`}
      </p>
      <p className="mt-2 text-fg">{TRAINING_MARKS_INTRO}</p>
      <ul className="mt-2 flex flex-col gap-1">
        {TRAINING_MARKS_LOSE.map((line) => (
          <li key={line}>• {line}</li>
        ))}
      </ul>
    </div>
  );
}
"use client";

import { SLOT_NAMES } from "@/lib/formations";
import { stintMinutes, type Stint } from "@/lib/minutes";
import { shortName } from "@/lib/players";

export function StintTally({
  stints,
  minute,
  ended,
}: {
  stints: Stint[];
  minute: number;
  ended: boolean;
}) {
  if (!stints.length) {
    return <p className="text-sm text-muted">Who, where and when appears once the clock is running.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-72 text-left text-sm">
        <thead>
          <tr className="text-xs uppercase tracking-wider text-muted">
            <th className="py-2 pr-2">Lad</th>
            <th className="py-2 pr-2">Where</th>
            <th className="py-2 pr-2">On</th>
            <th className="py-2 pr-2">Off</th>
            <th className="py-2">Mins</th>
          </tr>
        </thead>
        <tbody>
          {stints.map((stint) => (
            <tr key={stint.id} className="border-t border-border">
              <td className="py-2 pr-2 font-semibold">{shortName(stint.player)}</td>
              <td className="py-2 pr-2">{SLOT_NAMES[stint.slotId] || stint.slotId}</td>
              <td className="py-2 pr-2">{stint.onMinute}′</td>
              <td className="py-2 pr-2">{stint.offMinute === null ? (ended ? `${minute}′` : "on") : `${stint.offMinute}′`}</td>
              <td className="py-2 font-semibold">{stintMinutes(stint, minute, ended)}′</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

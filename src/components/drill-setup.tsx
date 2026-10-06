import { CHALLENGES_NAME } from "@/lib/brand";

function Cone({ x, y, label }: { x: number; y: number; label?: string }) {
  return (
    <g>
      <polygon points={`${x},${y - 9} ${x - 6},${y + 5} ${x + 6},${y + 5}`} fill="#e11d2e" stroke="#fff" strokeWidth="1" />
      {label ? (
        <text x={x} y={y + 16} textAnchor="middle" fill="#f4f4f5" fontSize="8" fontWeight="700">
          {label}
        </text>
      ) : null}
    </g>
  );
}

export function ZigzagDiagram() {
  const m = 8;
  const lx = 56;
  const rx = 56 + 10 * m;
  const yb = 318;
  const Y = (metres: number) => yb - metres * m;
  return (
    <svg viewBox="0 0 260 360" className="h-auto w-full max-w-md" aria-label="50m Zig Zag test with and without the ball">
      <rect x="8" y="6" width="244" height="348" rx="14" fill="#15703a" />
      <text x="130" y="24" textAnchor="middle" fill="#bbf7d0" fontSize="10" fontWeight="700">
        50m Zig Zag test
      </text>
      <text x="130" y="38" textAnchor="middle" fill="#86efac" fontSize="8">
        with and without the ball
      </text>
      <line x1={lx} y1={Y(0)} x2={lx} y2={Y(25)} stroke="#bbf7d0" strokeWidth="1.5" strokeDasharray="4 4" />
      <line x1={rx} y1={Y(0)} x2={rx} y2={Y(22)} stroke="#bbf7d0" strokeWidth="1.5" strokeDasharray="4 4" />

      <Cone x={rx} y={Y(0)} />
      <Cone x={rx} y={Y(2)} />
      <line x1={rx + 10} y1={Y(0)} x2={rx + 10} y2={Y(2)} stroke="#facc15" strokeWidth="2" />
      <text x={rx + 16} y={Y(1) + 3} fill="#facc15" fontSize="9" fontWeight="700">
        2m START
      </text>

      <Cone x={rx} y={Y(12)} />
      <text x={rx + 14} y={Y(12) + 4} fill="#f4f4f5" fontSize="9" fontWeight="700">
        X
      </text>
      <text x={rx + 14} y={Y(7)} fill="#bbf7d0" fontSize="8">
        10m
      </text>

      <Cone x={rx} y={Y(22)} />
      <text x={rx + 14} y={Y(17)} fill="#bbf7d0" fontSize="8">
        10m
      </text>

      <Cone x={lx} y={Y(0)} />
      <text x="130" y={Y(0) + 18} textAnchor="middle" fill="#facc15" fontSize="8" fontWeight="700">
        10m
      </text>

      <Cone x={lx} y={Y(5)} />
      <text x={lx - 28} y={Y(2.5) + 3} fill="#facc15" fontSize="8" fontWeight="700">
        5m
      </text>

      <Cone x={lx} y={Y(15)} />
      <text x={lx - 28} y={Y(10)} fill="#bbf7d0" fontSize="8">
        10m
      </text>

      <Cone x={lx} y={Y(25)} />
      <text x={lx - 28} y={Y(20)} fill="#bbf7d0" fontSize="8">
        10m
      </text>
      <text x={lx} y={Y(25) - 14} textAnchor="middle" fill="#f4f4f5" fontSize="9" fontWeight="700">
        FINISH
      </text>

      <line x1={lx} y1={Y(22)} x2={rx} y2={Y(22)} stroke="#facc15" strokeWidth="1" />
      <text x="130" y={Y(22) - 6} textAnchor="middle" fill="#facc15" fontSize="8" fontWeight="700">
        10m
      </text>
      <line x1={lx} y1={Y(12)} x2={rx} y2={Y(12)} stroke="#86efac" strokeWidth="1" />
      <text x="130" y={Y(12) - 6} textAnchor="middle" fill="#86efac" fontSize="8">
        10m
      </text>

      <path
        d={`M ${rx} ${Y(1)} L ${lx} ${Y(5)} L ${rx} ${Y(12)} L ${lx} ${Y(15)} L ${rx} ${Y(22)} L ${lx} ${Y(25)}`}
        fill="none"
        stroke="#facc15"
        strokeWidth="2.5"
        strokeDasharray="6 4"
      />
    </svg>
  );
}

export function SprintDiagram() {
  return (
    <svg viewBox="0 0 280 160" className="h-auto w-full" aria-label="30m sprint cone layout">
      <rect x="8" y="8" width="264" height="144" rx="12" fill="#166534" />
      <text x="140" y="24" textAnchor="middle" fill="#bbf7d0" fontSize="9" fontWeight="700">
        Path2Pro UK · Speed / running with the ball
      </text>
      {[0, 1, 2, 3].map((i) => {
        const x = 36 + i * 70;
        return (
          <g key={i}>
            <Cone x={x} y={48} />
            <Cone x={x} y={118} />
            <line x1={x} y1={48} x2={x} y2={118} stroke="#f4f4f5" strokeWidth="1.5" strokeDasharray="3 3" />
            <text x={x} y={140} textAnchor="middle" fill="#f4f4f5" fontSize="8" fontWeight="700">
              {i === 0 ? "START" : i === 3 ? "30m FINISH" : `${i * 10}m`}
            </text>
          </g>
        );
      })}
      <line x1="36" y1="83" x2="246" y2="83" stroke="#facc15" strokeWidth="2.5" />
      <text x="176" y="78" textAnchor="middle" fill="#facc15" fontSize="8" fontWeight="700">
        PASS from 20m
      </text>
      <text x="246" y="38" textAnchor="middle" fill="#f4f4f5" fontSize="8" fontWeight="700">
        30m
      </text>
    </svg>
  );
}

export function TurnsDiagram() {
  return (
    <svg viewBox="0 0 200 200" className="h-auto w-full max-w-[220px]" aria-label="3m turn box layout">
      <rect x="8" y="8" width="184" height="184" rx="12" fill="#166534" />
      <text x="100" y="26" textAnchor="middle" fill="#bbf7d0" fontSize="9" fontWeight="700">
        3m × 3m · Path2Pro UK turning
      </text>
      <rect x="50" y="50" width="100" height="100" fill="none" stroke="#f4f4f5" strokeWidth="3" />
      <Cone x={50} y={150} />
      <Cone x={150} y={150} />
      <Cone x={50} y={50} />
      <Cone x={150} y={50} />
      <line x1="50" y1="150" x2="150" y2="150" stroke="#facc15" strokeWidth="3" />
      <text x="100" y="172" textAnchor="middle" fill="#facc15" fontSize="8" fontWeight="700">
        START / FINISH line
      </text>
      <path d="M100 145 L100 60 L88 72 M100 60 L112 72" fill="none" stroke="#facc15" strokeWidth="2" />
      <text x="118" y="110" fill="#f4f4f5" fontSize="8">
        there
      </text>
      <text x="58" y="110" fill="#f4f4f5" fontSize="8">
        back
      </text>
    </svg>
  );
}

export function ShootingDiagram() {
  const m = 7;
  const cx = 180;
  const top = 48;
  const Y = (metres: number) => top + metres * m;
  const X = (fromCentre: number) => cx + fromCentre * m;
  const goalHalf = 7.32 / 2;
  const postL = X(-goalHalf);
  const postR = X(goalHalf);
  const outL = X(-goalHalf - 3);
  const outR = X(goalHalf + 3);
  const boxHalf = 40.32 / 2;
  const sixHalf = 18.32 / 2;
  const boxY = Y(10 + 16.5);
  const goalY = Y(10);
  const powerY = Y(0);
  return (
    <svg viewBox="0 0 360 430" className="h-auto w-full" aria-label="Full-size open-goal shooting set-up to scale">
      <rect x="8" y="6" width="344" height="418" rx="14" fill="#15703a" />
      <text x="180" y="24" textAnchor="middle" fill="#bbf7d0" fontSize="10" fontWeight="700">
        Full-size goal · to scale
      </text>
      <text x="180" y="38" textAnchor="middle" fill="#86efac" fontSize="8">
        Power line 10m behind the posts
      </text>

      <line x1={X(-14)} y1={powerY} x2={X(14)} y2={powerY} stroke="#facc15" strokeWidth="3" />
      {[ -12, -6, 0, 6, 12 ].map((dx) => (
        <Cone key={dx} x={X(dx)} y={powerY} />
      ))}
      <text x="180" y={powerY - 10} textAnchor="middle" fill="#facc15" fontSize="8" fontWeight="700">
        10m POWER LINE · +1 if the ball reaches here
      </text>
      <line x1="42" y1={powerY} x2="42" y2={goalY} stroke="#facc15" strokeWidth="1.5" />
      <text x="34" y={(powerY + goalY) / 2} fill="#facc15" fontSize="8" fontWeight="700" transform={`rotate(-90 34 ${(powerY + goalY) / 2})`}>
        10m
      </text>

      <rect x={postL} y={powerY + 8} width={postR - postL} height={goalY - powerY - 8} fill="none" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="3 3" />
      <text x="180" y={Y(5)} textAnchor="middle" fill="#e5e7eb" fontSize="8">
        behind the goal
      </text>

      <line x1={X(-22)} y1={goalY} x2={X(22)} y2={goalY} stroke="#f4f4f5" strokeWidth="2.5" />
      <rect x={postL} y={goalY - 18} width={postR - postL} height="18" fill="none" stroke="#f4f4f5" strokeWidth="3" />
      <line x1={postL} y1={goalY - 18} x2={postR} y2={goalY - 18} stroke="#f4f4f5" strokeWidth="4" />
      <text x="180" y={goalY - 22} textAnchor="middle" fill="#f4f4f5" fontSize="8" fontWeight="700">
        7.32m OPEN GOAL
      </text>

      <rect x={postL + 2} y={goalY - 16} width={14} height="14" fill="#b42318" />
      <text x={postL + 9} y={goalY - 6} textAnchor="middle" fill="#fff" fontSize="8" fontWeight="700">3</text>
      <rect x={postR - 16} y={goalY - 16} width={14} height="14" fill="#b42318" />
      <text x={postR - 9} y={goalY - 6} textAnchor="middle" fill="#fff" fontSize="8" fontWeight="700">3</text>
      <rect x={postL + 18} y={goalY - 16} width={postR - postL - 36} height="14" fill="#14532d" stroke="#86efac" strokeWidth="1" />
      <text x="180" y={goalY - 6} textAnchor="middle" fill="#bbf7d0" fontSize="8" fontWeight="700">2 near</text>

      <Cone x={postL} y={goalY} />
      <Cone x={postR} y={goalY} />
      <Cone x={outL} y={goalY} />
      <Cone x={outR} y={goalY} />
      <text x={outL} y={goalY + 18} textAnchor="middle" fill="#facc15" fontSize="7" fontWeight="700">1pt · 3m</text>
      <text x={outR} y={goalY + 18} textAnchor="middle" fill="#facc15" fontSize="7" fontWeight="700">1pt · 3m</text>

      <rect x={X(-boxHalf)} y={goalY} width={boxHalf * 2 * m} height={16.5 * m} fill="none" stroke="#e5e7eb" strokeWidth="2" />
      <rect x={X(-sixHalf)} y={goalY} width={sixHalf * 2 * m} height={5.5 * m} fill="none" stroke="#e5e7eb" strokeWidth="1.5" />
      <text x="180" y={Y(20)} textAnchor="middle" fill="#e5e7eb" fontSize="8">
        Penalty box 16.5m — do not enter
      </text>
      <line x1="318" y1={goalY} x2="318" y2={boxY} stroke="#86efac" strokeWidth="1.5" />
      <text x="328" y={(goalY + boxY) / 2} fill="#86efac" fontSize="8" fontWeight="700" transform={`rotate(90 328 ${(goalY + boxY) / 2})`}>
        16.5m
      </text>

      <circle cx={X(-16)} cy={boxY + 32} r="7" fill="#f4f4f5" stroke="#e11d2e" strokeWidth="2" />
      <text x={X(-16)} y={boxY + 54} textAnchor="middle" fill="#facc15" fontSize="8" fontWeight="700">
        LEFT · left foot ×3
      </text>
      <path
        d={`M ${X(-16) - 6} ${boxY + 32} L ${X(-22)} ${boxY + 10}`}
        fill="none"
        stroke="#86efac"
        strokeWidth="2.2"
        markerEnd="none"
      />
      <text x={X(-28)} y={boxY + 24} fill="#86efac" fontSize="7" fontWeight="700">
        push left
      </text>
      <path
        d={`M ${X(-22)} ${boxY + 10} L ${postR - 6} ${goalY - 6}`}
        fill="none"
        stroke="#facc15"
        strokeWidth="2"
        strokeDasharray="6 4"
      />
      <text x={postR - 4} y={goalY - 24} fill="#facc15" fontSize="7" fontWeight="700">
        far right
      </text>

      <circle cx={X(16)} cy={boxY + 32} r="7" fill="#f4f4f5" stroke="#e11d2e" strokeWidth="2" />
      <text x={X(16)} y={boxY + 54} textAnchor="middle" fill="#facc15" fontSize="8" fontWeight="700">
        RIGHT · right foot ×3
      </text>
      <path
        d={`M ${X(16) + 6} ${boxY + 32} L ${X(22)} ${boxY + 10}`}
        fill="none"
        stroke="#86efac"
        strokeWidth="2.2"
      />
      <text x={X(26)} y={boxY + 24} fill="#86efac" fontSize="7" fontWeight="700">
        push right
      </text>
      <path
        d={`M ${X(22)} ${boxY + 10} L ${postL + 6} ${goalY - 6}`}
        fill="none"
        stroke="#facc15"
        strokeWidth="2"
        strokeDasharray="6 4"
      />
      <text x={postL + 4} y={goalY - 24} fill="#facc15" fontSize="7" fontWeight="700">
        far left
      </text>

      <text x="180" y="408" textAnchor="middle" fill="#f4f4f5" fontSize="8" fontWeight="700">
        Push out with that foot · shoot across · never enter the box
      </text>
      <text x="180" y="422" textAnchor="middle" fill="#bbf7d0" fontSize="7">
        Left→far right corner · Right→far left corner · 3 far · 2 near · 1 just wide · +1 power
      </text>
    </svg>
  );
}

export function CullenTrial() {
  return (
    <section className="rounded-xl border border-accent bg-accent-soft p-4">
      <h3 className="font-display text-base font-bold uppercase tracking-wide">Cullen’s trial</h3>
      <p className="mt-2 text-sm leading-7 text-fg">Cullen Atkinson-Lee on the {CHALLENGES_NAME}.</p>
      <div className="relative mx-auto mt-3 w-full max-w-[280px] overflow-hidden rounded-lg bg-black" style={{ aspectRatio: "9 / 16" }}>
        <iframe
          className="absolute inset-0 h-full w-full"
          src="https://www.youtube-nocookie.com/embed/9_xEC-DHeFU"
          title={`${CHALLENGES_NAME} trial`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
      <p className="mt-2 text-center text-sm">
        <a
          className="font-semibold text-accent underline"
          href="https://youtube.com/shorts/9_xEC-DHeFU"
          target="_blank"
          rel="noreferrer"
        >
          Open on YouTube
        </a>
      </p>
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <figure>
          <img
            src="/drills/cullen-zigzag.jpg"
            alt="Cullen Atkinson-Lee sprinting the zigzag"
            className="w-full rounded-lg object-cover"
          />
          <figcaption className="mt-1 text-xs font-semibold uppercase tracking-wider text-muted">50m Zig Zag test</figcaption>
        </figure>
        <figure>
          <img
            src="/drills/cullen-turning.jpg"
            alt="Cullen Atkinson-Lee turning with the ball"
            className="w-full rounded-lg object-cover"
          />
          <figcaption className="mt-1 text-xs font-semibold uppercase tracking-wider text-muted">Cullen turning</figcaption>
        </figure>
        <figure>
          <img
            src="/drills/cullen-shooting.jpg"
            alt="Cullen Atkinson-Lee shooting"
            className="w-full rounded-lg object-cover"
          />
          <figcaption className="mt-1 text-xs font-semibold uppercase tracking-wider text-muted">Cullen shooting</figcaption>
        </figure>
      </div>
    </section>
  );
}

export function DrillSetupCards({ showClip = false }: { showClip?: boolean }) {
  return (
    <div className="flex flex-col gap-5">
      <p className="font-display text-lg font-bold uppercase tracking-tight text-accent">{CHALLENGES_NAME}</p>
      {showClip ? <CullenTrial /> : null}

      <article className="rounded-xl border border-border bg-surface p-4">
        <p className="font-display text-sm font-bold uppercase tracking-wide">1. 50m Zig Zag test with and without the ball</p>
        <p className="mt-1 text-xs uppercase tracking-wider text-muted">Path2Pro UK · 2m start gate · zig to the line, not around the cone</p>
        <img
          src="/drills/cullen-zigzag.jpg"
          alt="50m Zig Zag test with and without the ball"
          className="mt-3 w-full rounded-lg object-cover"
        />
        <div className="mt-3 flex justify-center">
          <ZigzagDiagram />
        </div>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-7 text-fg">
          <li>
            <span className="font-semibold">Start (bottom right):</span> two cones, 2m apart. That is the start gate.
          </li>
          <li>
            From the start, walk <span className="font-semibold">10m left</span> and drop a cone.
          </li>
          <li>
            Up the left line: <span className="font-semibold">5m</span>, cone. Then <span className="font-semibold">10m</span>, cone. Then <span className="font-semibold">10m</span> — that last cone is <span className="font-semibold">FINISH</span>.
          </li>
          <li>
            Up the right line from the start gate: <span className="font-semibold">10m</span> to cone <span className="font-semibold">X</span>. Then another <span className="font-semibold">10m</span>.
          </li>
          <li>
            Width is <span className="font-semibold">10m</span>. Zig to the opposite cone — to the <span className="font-semibold">line</span>, not around it — until the finish.
          </li>
        </ol>
        <p className="mt-3 text-sm leading-7 text-fg">
          <span className="font-semibold">Run:</span> zigzag to the first cone on the opposite side. Do not go around the cone — the body must reach the line by the cone. Keep going until the last gate.
        </p>
        <p className="text-sm leading-7 text-fg">
          <span className="font-semibold">Clock (with ball):</span> starts when he first pushes the ball. Stops when the foot is on the ball in the end gate.
        </p>
        <p className="text-sm leading-7 text-fg">
          <span className="font-semibold">Clock (without ball):</span> same course, same lines. Starts on the first push out. Stops through the end gate.
        </p>
        <p className="text-sm leading-7 text-muted">
          Tip: push out with knees bent. Do not slow down at the end.
        </p>
      </article>

      <article className="rounded-xl border border-border bg-surface p-4">
        <p className="font-display text-sm font-bold uppercase tracking-wide">2. Linear speed · 30m</p>
        <p className="mt-1 text-xs uppercase tracking-wider text-muted">Path2Pro UK · Speed and running with the ball</p>
        <div className="mt-3">
          <SprintDiagram />
        </div>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-7 text-fg">
          <li>Four cones in a line, 10m apart: 0m, 10m, 20m, 30m.</li>
          <li>Second line of four cones, 15m wide, so the lane is 15m across.</li>
        </ol>
        <p className="mt-3 text-sm leading-7 text-fg">
          <span className="font-semibold">Without ball:</span> clock starts when he pushes out. Stops when he reaches 30m.
        </p>
        <p className="text-sm leading-7 text-fg">
          <span className="font-semibold">With ball:</span> clock starts when he first pushes the ball. At 20m he must pass through the end cones at 30m. Clock stops when the ball crosses the 30m line.
        </p>
      </article>

      <article className="rounded-xl border border-border bg-surface p-4">
        <p className="font-display text-sm font-bold uppercase tracking-wide">3. Turns · 3m box</p>
        <p className="mt-1 text-xs uppercase tracking-wider text-muted">Path2Pro UK · Turning · foot on the ball to finish</p>
        <img
          src="/drills/cullen-turning.jpg"
          alt="Cullen Atkinson-Lee turning with the ball"
          className="mt-3 w-full rounded-lg object-cover"
        />
        <div className="mt-3 flex justify-center">
          <TurnsDiagram />
        </div>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-7 text-fg">
          <li>Mark a 3m square (four cones).</li>
          <li>Start on the line, ball at feet.</li>
          <li>There (3m) — turn. Back (3m) — turn. There (3m) — last turn. Sprint back.</li>
          <li>Stop with the foot on the ball on the start line.</li>
        </ol>
        <p className="mt-3 text-sm leading-7 text-muted">Head over the ball. Knees bent. Don’t slow down into the turn.</p>
      </article>

      <article className="rounded-xl border border-border bg-surface p-4">
        <p className="font-display text-sm font-bold uppercase tracking-wide">4. Shooting · Path2Pro UK</p>
        <p className="mt-1 text-xs uppercase tracking-wider text-muted">
          Full-size open goal · push out, then shoot across to the far corner
        </p>
        <img
          src="/drills/cullen-shooting.jpg"
          alt="Shooting challenge"
          className="mt-3 w-full rounded-lg object-cover"
        />
        <div className="mt-3">
          <ShootingDiagram />
        </div>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-7 text-fg">
          <li>Full-size open goal. Two cones on the goal line, in line with each post — those are the bottom-corner boxes.</li>
          <li>Two more cones 3m outside each post — the “just wide” zone. A line of cones 10m behind the goal — power line.</li>
          <li>Start outside the penalty box. Push the ball out to the side with that foot, then shoot. You must not enter the box — if you do, that shot is <span className="font-semibold">0 points</span>.</li>
          <li>
            Six shots:
            <span className="font-semibold"> 3 from the left — push left with the left foot, shoot left foot into the far right corner</span>.
            Then
            <span className="font-semibold"> 3 from the right — push right with the right foot, shoot right foot into the far left corner</span>.
          </li>
        </ol>
        <div className="mt-3 overflow-hidden rounded-lg border border-border">
          <p className="bg-elevated px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted">Points per shot</p>
          <ul className="divide-y divide-border text-sm leading-7 text-fg">
            <li className="flex justify-between px-3 py-2"><span>Bottom far corner (left foot → right corner, right foot → left corner)</span><span className="font-semibold">3</span></li>
            <li className="flex justify-between px-3 py-2"><span>Goal, but near side</span><span className="font-semibold">2</span></li>
            <li className="flex justify-between px-3 py-2"><span>Just outside the post (inside the 3m cone)</span><span className="font-semibold">1</span></li>
            <li className="flex justify-between px-3 py-2"><span>Power: ball reaches the 10m line behind the goal</span><span className="font-semibold">+1 each</span></li>
            <li className="flex justify-between px-3 py-2"><span>Miss, or shot from inside the box</span><span className="font-semibold">0</span></li>
          </ul>
        </div>
        <p className="mt-3 text-sm leading-7 text-muted">More scoring detail to come. Heading will be added next.</p>
      </article>
    </div>
  );
}

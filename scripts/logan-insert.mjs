import { PGlite } from "@electric-sql/pglite";

const pg = new PGlite({ dataDir: "/workspace/data/pglite" });
await pg.waitReady;
await pg.exec(`
  create table if not exists parent_logins (
    player text primary key,
    pin text not null unique,
    family text not null default '',
    created_at timestamptz not null default now()
  )
`);
const existing = await pg.query("select player, pin from parent_logins where player = $1", ["6) Logan Massey"]);
if (existing.rows.length) {
  console.log(JSON.stringify({ already: true, pin: existing.rows[0].pin }));
} else {
  const taken = await pg.query("select player from parent_logins where pin = $1", ["040715"]);
  const pin = taken.rows.length ? "615704" : "040715";
  await pg.query(
    "insert into parent_logins (player, pin, family) values ($1,$2,$3) on conflict (player) do nothing",
    ["6) Logan Massey", pin, "6) Logan Massey"],
  );
  const row = await pg.query("select pin from parent_logins where player = $1", ["6) Logan Massey"]);
  console.log(JSON.stringify({ inserted: true, pin: row.rows[0]?.pin || pin }));
}
await pg.close?.();

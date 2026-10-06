//#region node_modules/.nitro/vite/services/ssr/assets/db-BsCi4Y91.js
var _0002_votes_default = "create table if not exists votes (\n  id           serial primary key,\n  game_number  text not null,\n  opposition   text not null,\n  voter_child  text not null,\n  vote_3       text not null,\n  vote_2       text not null,\n  vote_1       text not null,\n  created_at   timestamptz not null default now()\n);\n\ncreate unique index if not exists votes_game_voter_idx\n  on votes (lower(btrim(game_number)), lower(btrim(voter_child)));\n\ncreate index if not exists votes_created_at_idx on votes (created_at desc);\n";
var _0003_current_match_default = "create table if not exists current_match (\n  id           integer primary key check (id = 1),\n  game_number  text not null,\n  opposition   text not null,\n  updated_at   timestamptz not null default now()\n);\n";
var _0004_league_default = "create table if not exists league_fixtures (\n  id          serial primary key,\n  kickoff     text not null,\n  home_team   text not null,\n  away_team   text not null,\n  venue       text not null default '',\n  home_goals  integer,\n  away_goals  integer\n);\n\ninsert into league_fixtures (kickoff, home_team, away_team, venue) values\n  ('2026-09-06T09:00', 'Pine Villa U12 s', 'Cherrybrook U12 Bulls', 'Albany Academy'),\n  ('2026-09-20T09:00', 'Newton-Le-Willows U12 Rangers', 'Cherrybrook U12 Bulls', 'King George V Playing Fields (Newton-le-Willows)'),\n  ('2026-09-27T11:15', 'Cherrybrook U12 Bulls', 'Daisy Hill Junior U12 Devils', 'Laithwaite Park Hub P2 (3) 9v9'),\n  ('2026-10-04T11:15', 'Standish Panthers Juniors U12 Storm', 'Cherrybrook U12 Bulls', 'Laithwaite Park Hub P2 (2) 9v9'),\n  ('2026-10-11T10:00', 'Cherrybrook U12 Bulls', 'Cherrybrook U12 cobras', 'Laithwaite Park Hub P2 (2) 9v9'),\n  ('2026-10-18T09:00', 'Robin Park U12 Raptors', 'Cherrybrook U12 Bulls', 'William Fosters Pitch 2 (3) 9v9'),\n  ('2026-10-25T10:00', 'Cherrybrook U12 Bulls', 'Ladybridge U12 Dynamos', 'Laithwaite Park Hub P2 (3) 9v9'),\n  ('2026-11-01T09:00', 'Matthiola U12 Atletico (Sun)', 'Cherrybrook U12 Bulls', 'The Oaks (Risley)'),\n  ('2026-11-22T10:00', 'Cherrybrook U12 Bulls', 'Newton-Le-Willows U12 Rangers', 'Laithwaite Park Hub P2 (2) 9v9'),\n  ('2026-11-29T09:00', 'Daisy Hill Junior U12 Devils', 'Cherrybrook U12 Bulls', 'Daisy Hill Juniors FC'),\n  ('2026-12-13T08:45', 'Cherrybrook U12 cobras', 'Cherrybrook U12 Bulls', 'Laithwaite Park Hub P2 (3) 9v9'),\n  ('2027-01-10T10:00', 'Cherrybrook U12 Bulls', 'Robin Park U12 Raptors', 'Laithwaite Park Hub P2 (3) 9v9'),\n  ('2027-01-17T09:00', 'Ladybridge U12 Dynamos', 'Cherrybrook U12 Bulls', 'Ladybridge Lane'),\n  ('2027-01-24T08:45', 'Cherrybrook U12 Bulls', 'Matthiola U12 Atletico (Sun)', 'Laithwaite Park Hub P2 (3) 9v9'),\n  ('2027-01-31T08:45', 'Cherrybrook U12 Bulls', 'Golborne Sports Junior U12 Gladiators', 'Laithwaite Park Hub P2 (3) 9v9'),\n  ('2027-02-07T11:30', 'Golborne Sports Junior U12 Gladiators', 'Cherrybrook U12 Bulls', 'William Fosters Pitch 2 (3) 9v9'),\n  ('2027-02-28T08:45', 'Cherrybrook U12 Bulls', 'Standish Panthers Juniors U12 Storm', 'Laithwaite Park Hub P2 (2) 9v9'),\n  ('2027-03-21T08:45', 'Cherrybrook U12 Bulls', 'Pine Villa U12 s', 'Laithwaite Park Hub P2 (3) 9v9');\n";
var _0005_awards_default = "create table if not exists match_awards (\n  id              serial primary key,\n  game_number     text not null,\n  opposition      text not null,\n  opp_mom         text,\n  players_player  text,\n  updated_at      timestamptz not null default now()\n);\n\ncreate unique index if not exists match_awards_game_idx\n  on match_awards (game_number, opposition);\n";
var _0006_player_notes_default = "create table if not exists player_notes (\n  player      text primary key,\n  note        text not null default '',\n  updated_at  timestamptz not null default now()\n);\n";
var _0007_divisions_fitness_default = "create table if not exists division_standings (\n  division  text not null,\n  team      text not null,\n  played    integer not null default 0,\n  won       integer not null default 0,\n  drawn     integer not null default 0,\n  lost      integer not null default 0,\n  gd        integer not null default 0,\n  pts       integer not null default 0,\n  primary key (division, team)\n);\n\ninsert into division_standings (division, team) values\n  ('north', 'Cherrybrook U12 madrid'),\n  ('north', 'Cherrybrook U12 warriors'),\n  ('north', 'FS Coaching Academy U12 FS Academy'),\n  ('north', 'Golborne Sports Junior U12 Spartans'),\n  ('north', 'Ladybridge U12 Lions'),\n  ('north', 'Penlake U12 Rangers {Sunday}'),\n  ('north', 'Robin Park U12 Rangers'),\n  ('north', 'Whittle Hall U12 Titans (Sunday)'),\n  ('east', 'Cherrybrook U12 eagles'),\n  ('east', 'Cherrybrook U12 hornets'),\n  ('east', 'Daisy Hill Junior U12 Titans'),\n  ('east', 'Golborne Sports Junior U12 Vikings'),\n  ('east', 'Hawkley U12 Hawkley'),\n  ('east', 'Highfield Grange U12 ''s Rangers'),\n  ('east', 'Hindley Juniors U12 Falcons'),\n  ('east', 'Shevington U12 Royals')\non conflict do nothing;\n\ncreate table if not exists fitness_tests (\n  id                 serial primary key,\n  player             text not null,\n  tested_on          date not null,\n  zz50_no_ball       numeric,\n  zz50_ball          numeric,\n  sprint30_no_ball   numeric,\n  sprint30_ball      numeric,\n  turns_3x4          numeric,\n  created_at         timestamptz not null default now(),\n  unique (player, tested_on)\n);\n";
var _0008_u12_west_default = "insert into division_standings (division, team) values\n  ('west', 'Ladybridge U12 Leopards'),\n  ('west', 'Highfield Grange U12 ''s Athletic'),\n  ('west', 'Pine Villa U12 Tangerine'),\n  ('west', 'Clay Brow Clay Brow Athletico U12'),\n  ('west', 'Astley & Tyldesley J.F.C. U12 Typhoons'),\n  ('west', 'Golborne Sports Junior U12 Jaguars'),\n  ('west', 'Appley Bridge U12'),\n  ('west', 'Shevington U12 Sky'),\n  ('west', 'Golborne Sports Junior U12 Pumas'),\n  ('west', 'JFC Chorley U12 JFC Chorley Reds'),\n  ('west', 'Hindley Green U12')\non conflict do nothing;\n";
var _0009_u12_west_2627_default = "delete from division_standings where division = 'west';\n\ninsert into division_standings (division, team) values\n  ('west', 'Cherrybrook U12 Knights'),\n  ('west', 'Cherrybrook U12 robins'),\n  ('west', 'Cherrybrook U12 raiders'),\n  ('west', 'FC Wigan U12 FC Wigan Warriors'),\n  ('west', 'Golborne Sports Junior U12 Falcons'),\n  ('west', 'Bolton Lads & Girls Club U12 BLGC Lions'),\n  ('west', 'Standish Panthers Juniors U12 Lightning'),\n  ('west', 'Hindley Juniors U12 Jaguars'),\n  ('west', 'Appley Bridge U12'),\n  ('west', 'F.C. Britannia (Wigan) U12 Yellow'),\n  ('west', 'Leigh Genesis U12 Formation')\non conflict do nothing;\n";
var _0010_u12_west_correct_default = "delete from division_standings where division = 'west';\n\ninsert into division_standings (division, team) values\n  ('west', 'Appley Bridge U12'),\n  ('west', 'Bolton Lads & Girls Club U12 BLGC Lions'),\n  ('west', 'Cherrybrook U12 Knights'),\n  ('west', 'Cherrybrook U12 hurricanes'),\n  ('west', 'Cherrybrook U12 raiders'),\n  ('west', 'F.C. Britannia (Wigan) U12 Blue'),\n  ('west', 'F.C. Britannia (Wigan) U12 Whites'),\n  ('west', 'F.C. Britannia (Wigan) U12 Yellow'),\n  ('west', 'Standish Panthers Juniors U12 Lightning'),\n  ('west', 'Winwick Spartans U12 Sharks')\non conflict do nothing;\n";
var _0011_fa_sync_default = "create table if not exists fa_sync (\n  id          integer primary key,\n  last_ok     timestamptz,\n  last_error  text\n);\n\ninsert into fa_sync (id) values (1) on conflict do nothing;\n\ninsert into division_standings (division, team)\nselect 'south', team from (values\n  ('Cherrybrook U12 Bulls'),\n  ('Cherrybrook U12 cobras'),\n  ('Daisy Hill Junior U12 Devils'),\n  ('Golborne Sports Junior U12 Gladiators'),\n  ('Ladybridge U12 Dynamos'),\n  ('Matthiola U12 Atletico (Sun)'),\n  ('Newton-Le-Willows U12 Rangers'),\n  ('Pine Villa U12 s'),\n  ('Robin Park U12 Raptors'),\n  ('Standish Panthers Juniors U12 Storm')\n) s(team)\non conflict do nothing;\n";
var _0012_appearances_default = "create table if not exists match_appearances (\n  game_number text not null,\n  opposition  text not null,\n  player      text not null,\n  primary key (game_number, opposition, player)\n);\n";
var _0013_clear_appearances_default = "-- No games played yet — squad ticks start empty until the coach sets them.\ndelete from match_appearances;\n";
var _0014_training_default = "create table if not exists training_attendance (\n  session_date text not null,\n  player       text not null,\n  attended     integer not null default 0,\n  score        integer,\n  label        text not null default '',\n  updated_at   timestamptz not null default now(),\n  primary key (session_date, player)\n);\n";
var _0015_training_attitude_default = "alter table training_attendance add column attitude integer;\n";
var _0016_votes_unique_opposition_default = "drop index if exists votes_game_voter_idx;\n\ncreate unique index if not exists votes_game_opp_voter_idx\n  on votes (lower(btrim(game_number)), lower(btrim(opposition)), lower(btrim(voter_child)));\n";
var _0017_training_effort_achievement_default = "alter table training_attendance add column effort integer;\nalter table training_attendance add column achievement integer;\n";
var _0018_player_of_month_default = "create table if not exists player_of_month (\n  month           text primary key,\n  player          text not null,\n  parent_pts      integer not null default 0,\n  training_pts    integer not null default 0,\n  opp_mom         integer not null default 0,\n  players_player  integer not null default 0,\n  total           integer not null default 0,\n  awarded_on      text not null,\n  created_at      timestamptz not null default now()\n);\n";
var _0019_manager_player_default = "alter table match_awards add column manager_player text;\n";
var _0020_match_stats_default = "create table if not exists match_results (\n  game_number    text not null,\n  opposition     text not null,\n  goals_for      integer not null default 0,\n  goals_against  integer not null default 0,\n  notes          text,\n  updated_at     timestamptz not null default now(),\n  primary key (game_number, opposition)\n);\n\ncreate table if not exists match_player_stats (\n  game_number     text not null,\n  opposition      text not null,\n  player          text not null,\n  goals           integer not null default 0,\n  assists         integer not null default 0,\n  pre_assists     integer not null default 0,\n  shots           integer not null default 0,\n  tackles         integer not null default 0,\n  interceptions   integer not null default 0,\n  blocks          integer not null default 0,\n  recoveries      integer not null default 0,\n  saves           integer not null default 0,\n  catches         integer not null default 0,\n  crosses         integer not null default 0,\n  dribbles        integer not null default 0,\n  fouls           integer not null default 0,\n  updated_at      timestamptz not null default now(),\n  primary key (game_number, opposition, player)\n);\n";
var _0021_pine_villa_kickoff_default = "update league_fixtures\nset kickoff = '2026-09-06T11:00'\nwhere kickoff like '2026-09-06%'\n  and (\n    (home_team ilike '%Pine Villa%' and away_team ilike '%Bulls%')\n    or (away_team ilike '%Pine Villa%' and home_team ilike '%Bulls%')\n  );\n";
var _0022_pitch_boards_default = "create table if not exists pitch_boards (\n  pitch_no   integer primary key check (pitch_no between 1 and 3),\n  formation  text not null default '3-3-2',\n  lineup     jsonb not null default '{}'::jsonb,\n  updated_at timestamptz not null default now()\n);\n\ninsert into pitch_boards (pitch_no, formation, lineup)\nvalues\n  (1, '3-3-2', '{}'::jsonb),\n  (2, '3-3-2', '{}'::jsonb),\n  (3, '3-3-2', '{}'::jsonb)\non conflict (pitch_no) do nothing;\n";
var _0023_pitch_kit_default = "alter table pitch_boards add column if not exists kit text not null default 'home';\n";
var _0024_match_plans_default = "create table if not exists match_plans (\n  opposition  text not null,\n  kickoff     text not null,\n  venue       text,\n  home        boolean not null default true,\n  formation   text not null default '3-3-2',\n  kit         text not null default 'home',\n  lineup      jsonb not null default '{}'::jsonb,\n  brief       jsonb not null default '{}'::jsonb,\n  updated_at  timestamptz not null default now(),\n  primary key (opposition, kickoff)\n);\n";
var _0025_match_live_default = "create table if not exists match_live (\n  opposition  text not null,\n  kickoff     text not null,\n  started_at  timestamptz,\n  elapsed_ms  integer not null default 0,\n  running     boolean not null default false,\n  ended       boolean not null default false,\n  formation   text not null default '3-3-2',\n  lineup      jsonb not null default '{}'::jsonb,\n  primary key (opposition, kickoff)\n);\n\ncreate table if not exists match_stints (\n  id          serial primary key,\n  opposition  text not null,\n  kickoff     text not null,\n  player      text not null,\n  slot_id     text not null,\n  on_minute   integer not null,\n  off_minute  integer,\n  started     boolean not null default false\n);\n\ncreate index if not exists match_stints_game on match_stints (opposition, kickoff);\n\ncreate table if not exists match_shape_changes (\n  id          serial primary key,\n  opposition  text not null,\n  kickoff     text not null,\n  minute      integer not null,\n  formation   text not null\n);\n";
var _0026_coach_users_default = "create table if not exists coach_users (\n  id          integer generated always as identity primary key,\n  name        text not null,\n  pin         text not null unique,\n  created_at  timestamptz not null default now()\n);\n\ninsert into coach_users (name, pin)\nvalues\n  ('Brian Lee', '0803'),\n  ('Dave Bailey', '123456')\non conflict (pin) do nothing;\n";
var _0027_match_half_default = "alter table match_live add column if not exists half integer not null default 1;\nalter table match_live add column if not exists half_mark_ms integer not null default 0;\n";
var _0028_coach_role_default = "alter table coach_users add column if not exists role text not null default 'coach';\n\nupdate coach_users\nset role = 'admin'\nwhere pin = '0803' or name = 'Brian Lee';\n";
var _0029_demo_squad_default = "create table if not exists demo_players (\n  id          integer generated always as identity primary key,\n  owner       text not null,\n  shirt       text not null default '',\n  name        text not null,\n  created_at  timestamptz not null default now()\n);\n\ncreate unique index if not exists demo_players_owner_label\n  on demo_players (owner, shirt, name);\n";
var _0030_coach_presence_default = "create table if not exists coach_presence (\n  name       text primary key,\n  last_seen  timestamptz not null default now()\n);\n";
var _0031_presence_ms_default = "alter table coach_presence add column if not exists last_seen_ms bigint;\n";
var _0032_parent_presence_default = "create table if not exists parent_presence (\n  id            text primary key,\n  child         text not null default '',\n  page          text not null default '',\n  last_seen_ms  bigint not null\n);\n";
var _0033_squad_edit_default = "create table if not exists squad_removed (\n  player text primary key\n);\n\ncreate table if not exists squad_added (\n  id      integer generated always as identity primary key,\n  shirt   text not null default '',\n  name    text not null,\n  unique (shirt, name)\n);\n";
var _0034_perf_submissions_default = "create table if not exists perf_submissions (\n  id              serial primary key,\n  player          text not null,\n  test_kind       text not null,\n  submitted_secs  numeric,\n  video_mime      text,\n  video_data      text,\n  status          text not null default 'pending',\n  coach_secs      numeric,\n  coach_note      text,\n  created_at      timestamptz not null default now(),\n  assessed_at     timestamptz\n);\n\ncreate index if not exists perf_submissions_player_idx on perf_submissions (player, created_at desc);\ncreate index if not exists perf_submissions_status_idx on perf_submissions (status, created_at desc);\n";
var _0035_parent_login_default = "create table if not exists parent_logins (\n  player      text primary key,\n  pin         text not null unique,\n  family      text not null default '',\n  created_at  timestamptz not null default now()\n);\n";
var _0036_audit_log_default = "create table if not exists audit_log (\n  id      serial primary key,\n  at      timestamptz not null default now(),\n  actor   text not null,\n  role    text not null default '',\n  action  text not null,\n  detail  text not null default '',\n  player  text\n);\n\ncreate index if not exists audit_log_at_idx on audit_log (at desc);\n";
var _0037_parent_sessions_default = "create table if not exists parent_attempts (\n  id            text primary key,\n  fails         integer not null default 0,\n  locked_until  timestamptz,\n  last_at       timestamptz not null default now()\n);\n\ncreate table if not exists parent_sessions (\n  token_hash  text primary key,\n  player      text not null,\n  family      text not null default '',\n  expires     timestamptz not null\n);\n\ncreate index if not exists parent_sessions_expires_idx on parent_sessions (expires);\n";
var _0038_parent_login_ensure_default = "create table if not exists parent_logins (\n  player      text primary key,\n  pin         text not null unique,\n  family      text not null default '',\n  created_at  timestamptz not null default now()\n);\n\ncreate table if not exists parent_attempts (\n  id            text primary key,\n  fails         integer not null default 0,\n  locked_until  timestamptz,\n  last_at       timestamptz not null default now()\n);\n\ncreate table if not exists parent_sessions (\n  token_hash  text primary key,\n  player      text not null,\n  family      text not null default '',\n  expires     timestamptz not null\n);\n\ncreate index if not exists parent_sessions_expires_idx on parent_sessions (expires);\n\ncreate table if not exists perf_submissions (\n  id              serial primary key,\n  player          text not null,\n  test_kind       text not null,\n  submitted_secs  numeric,\n  video_mime      text,\n  video_data      text,\n  status          text not null default 'pending',\n  coach_secs      numeric,\n  coach_note      text,\n  created_at      timestamptz not null default now(),\n  assessed_at     timestamptz\n);\n";
var _0039_shooting_default = "alter table fitness_tests add column if not exists shooting_pts numeric;\nalter table fitness_tests add column if not exists shooting_power numeric;\n";
var _0040_technique_default = "alter table perf_submissions add column if not exists technique integer;\n";
var _0041_opening_weekend_default = "update league_fixtures\nset home_goals = 7, away_goals = 6\nwhere home_team = 'Pine Villa U12 s'\n  and away_team = 'Cherrybrook U12 Bulls'\n  and home_goals is null\n  and away_goals is null;\n\nupdate division_standings\nset played = 1, won = 1, drawn = 0, lost = 0, gd = 1, pts = 3\nwhere division = 'north' and team = 'Robin Park U12 Rangers' and played = 0;\n\nupdate division_standings\nset played = 1, won = 0, drawn = 0, lost = 1, gd = -1, pts = 0\nwhere division = 'north' and team = 'Whittle Hall U12 Titans (Sunday)' and played = 0;\n\nupdate division_standings\nset played = 1, won = 1, drawn = 0, lost = 0, gd = 7, pts = 3\nwhere division = 'east' and team = 'Hawkley U12 Hawkley' and played = 0;\n\nupdate division_standings\nset played = 1, won = 1, drawn = 0, lost = 0, gd = 6, pts = 3\nwhere division = 'east' and team = 'Hindley Juniors U12 Falcons' and played = 0;\n\nupdate division_standings\nset played = 1, won = 1, drawn = 0, lost = 0, gd = 4, pts = 3\nwhere division = 'east' and team = 'Cherrybrook U12 hornets' and played = 0;\n\nupdate division_standings\nset played = 1, won = 1, drawn = 0, lost = 0, gd = 1, pts = 3\nwhere division = 'east' and team = 'Highfield Grange U12 ''s Rangers' and played = 0;\n\nupdate division_standings\nset played = 1, won = 0, drawn = 0, lost = 1, gd = -1, pts = 0\nwhere division = 'east' and team = 'Cherrybrook U12 eagles' and played = 0;\n\nupdate division_standings\nset played = 1, won = 0, drawn = 0, lost = 1, gd = -4, pts = 0\nwhere division = 'east' and team = 'Shevington U12 Royals' and played = 0;\n\nupdate division_standings\nset played = 1, won = 0, drawn = 0, lost = 1, gd = -6, pts = 0\nwhere division = 'east' and team = 'Daisy Hill Junior U12 Titans' and played = 0;\n\nupdate division_standings\nset played = 1, won = 0, drawn = 0, lost = 1, gd = -7, pts = 0\nwhere division = 'east' and team = 'Golborne Sports Junior U12 Vikings' and played = 0;\n";
var _0042_match_sheets_default = "alter table league_fixtures add column if not exists status text not null default '';\n\ncreate table if not exists match_goals (\n  id          serial primary key,\n  fixture_id  integer not null,\n  minute      integer not null default 0,\n  scorer      text not null,\n  assist      text,\n  sort_order  integer not null default 0\n);\n\ncreate table if not exists division_results (\n  division    text not null,\n  kickoff     text not null,\n  home_team   text not null,\n  away_team   text not null,\n  home_goals  integer not null,\n  away_goals  integer not null,\n  venue       text not null default '',\n  status      text not null default '',\n  primary key (division, home_team, away_team, kickoff)\n);\n";
var _0043_division_fixture_times_default = "alter table division_results alter column home_goals drop not null;\nalter table division_results alter column away_goals drop not null;\n";
var _0044_potm_podium_default = "alter table player_of_month add column if not exists second_player text;\nalter table player_of_month add column if not exists third_player text;\n";
/**
* Migration bookkeeping shared by the two appliers — `scripts/migrate.mjs`
* (deploy, `readdir`) and `src/lib/db.ts` (PGLite preview, `import.meta.glob`).
*
* Applied files are keyed by BASENAME, so the same file applies once no matter
* which directory it is globbed from. That is what makes the auth schema safe to
* copy from `migrations/auth/` into `migrations/` when an app turns sign-in on:
* a database that already has `0001_auth.sql` will not re-run it.
*
* Neither applier descends into subdirectories, so `migrations/auth/*.sql` is
* out of scope for both until it is copied up.
*/
/**
* The `_migrations` key for a migration path (or bare filename).
* @param {string} path
* @returns {string}
*/
function migrationName(path) {
	return path.split("/").pop() ?? path;
}
/**
* @param {string} path
* @returns {boolean}
*/
function isMigrationFile(path) {
	return path.endsWith(".sql");
}
/**
* Migrations in `paths` that are not yet in `applied`, in apply order.
* Non-`.sql` entries (a `readdir` also yields `migrations/auth/`) are dropped.
* @param {Iterable<string>} paths
* @param {Iterable<string>} applied
* @returns {Array<{ name: string, path: string }>}
*/
function pendingMigrations(paths, applied) {
	const done = new Set(applied);
	return [...paths].filter(isMigrationFile).map((path) => ({
		name: migrationName(path),
		path
	})).sort((a, b) => a.name.localeCompare(b.name)).filter(({ name }) => !done.has(name));
}
var rawDatabaseUrl = typeof process !== "undefined" ? process.env.DATABASE_URL : void 0;
var databaseUrl = rawDatabaseUrl && rawDatabaseUrl.trim() ? rawDatabaseUrl : void 0;
/**
* Active backend: real **Neon** when `DATABASE_URL` is set (deployed / configured
* sandbox), otherwise a local embedded **PGLite** (Postgres compiled to WASM) so
* the app has a working database even with nothing configured — the live preview
* included. Swap in Neon later by just setting `DATABASE_URL`; no code changes.
*/
var dbSource = databaseUrl ? "neon" : "pglite";
/**
* Init state lives on globalThis as promises: dev HMR creates new instances of
* this module, and two instances racing module-level state would open a second
* pool or run two concurrent PGLite migration passes (whose duplicate
* `_migrations` insert rejects — and would get memoized, poisoning every later
* `getSql()`). A failed init clears its slot so the next call retries.
*/
var globalRef = globalThis;
/**
* Result-type parity: Postgres sends every value as text plus a type OID — the
* JS value is the DRIVER's parsing choice, and pg and PGLite disagree (pg:
* int8 -> string, date -> local-midnight Date; PGLite: int8 -> BigInt, which
* JSON.stringify rejects, date -> UTC Date). Normalize both so preview and
* production return identical, JSON-safe shapes:
*   int8/bigint (incl. count(*)) -> number (past 2^53 loses precision — cast
*                                   `::text` if you ever need huge integers)
*   date                         -> 'YYYY-MM-DD' string
*   interval                     -> Postgres interval text
* numeric already comes back as a string on both (arbitrary precision).
*/
var OID_INT8 = 20;
var OID_DATE = 1082;
var OID_INTERVAL = 1186;
var identity = (v) => v;
/** Wrap a query runner in the tagged-template + `.query()` `Sql` surface. */
function toSql(run) {
	const sql = (async (strings, ...values) => {
		let text = strings[0];
		for (let i = 0; i < values.length; i += 1) text += `$${i + 1}${strings[i + 1]}`;
		return run(text, values);
	});
	sql.query = (text, params = []) => run(text, params);
	return sql;
}
function createNeonSql() {
	globalRef.__pgSqlPromise__ ??= (async () => {
		const { Pool, types } = await import("../_libs/pg.mjs").then((n) => n.t);
		types.setTypeParser(OID_INT8, Number);
		types.setTypeParser(OID_DATE, identity);
		types.setTypeParser(OID_INTERVAL, identity);
		const pool = new Pool({ connectionString: databaseUrl });
		return toSql(async (text, params) => {
			return (await pool.query(text, params)).rows;
		});
	})().catch((err) => {
		globalRef.__pgSqlPromise__ = void 0;
		throw err;
	});
	return globalRef.__pgSqlPromise__;
}
async function createPgliteSql() {
	globalRef.__pgliteInstance__ ??= (async () => {
		const { PGlite } = await import("../_libs/electric-sql__pglite.mjs").then((n) => n.t);
		const dataDir = "/workspace/data/pglite";
		const open = async () => {
			const fs = await import("node:fs");
			try {
				fs.mkdirSync(dataDir, { recursive: true });
			} catch {}
			const pg = new PGlite({
				dataDir,
				parsers: {
					[OID_INT8]: Number,
					[OID_DATE]: identity,
					[OID_INTERVAL]: identity
				}
			});
			await pg.waitReady;
			await pg.exec("create table if not exists _migrations (name text primary key, applied_at timestamptz not null default now())");
			return pg;
		};
		try {
			return await open();
		} catch (err) {
			console.error("[db] PGLite data dir failed, resetting so the app can load:", err);
			const stamp = (/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-");
			try {
				const fs = await import("node:fs");
				if (fs.existsSync(dataDir)) fs.renameSync(dataDir, `${dataDir}.broken-${stamp}`);
			} catch (moveErr) {
				console.error("[db] could not move broken PGLite dir:", moveErr);
			}
			return await open();
		}
	})().catch((err) => {
		globalRef.__pgliteInstance__ = void 0;
		throw err;
	});
	const pg = await globalRef.__pgliteInstance__;
	const migrate = async () => {
		const migrations = /* #__PURE__ */ Object.assign({
			"/migrations/0002_votes.sql": _0002_votes_default,
			"/migrations/0003_current_match.sql": _0003_current_match_default,
			"/migrations/0004_league.sql": _0004_league_default,
			"/migrations/0005_awards.sql": _0005_awards_default,
			"/migrations/0006_player_notes.sql": _0006_player_notes_default,
			"/migrations/0007_divisions_fitness.sql": _0007_divisions_fitness_default,
			"/migrations/0008_u12_west.sql": _0008_u12_west_default,
			"/migrations/0009_u12_west_2627.sql": _0009_u12_west_2627_default,
			"/migrations/0010_u12_west_correct.sql": _0010_u12_west_correct_default,
			"/migrations/0011_fa_sync.sql": _0011_fa_sync_default,
			"/migrations/0012_appearances.sql": _0012_appearances_default,
			"/migrations/0013_clear_appearances.sql": _0013_clear_appearances_default,
			"/migrations/0014_training.sql": _0014_training_default,
			"/migrations/0015_training_attitude.sql": _0015_training_attitude_default,
			"/migrations/0016_votes_unique_opposition.sql": _0016_votes_unique_opposition_default,
			"/migrations/0017_training_effort_achievement.sql": _0017_training_effort_achievement_default,
			"/migrations/0018_player_of_month.sql": _0018_player_of_month_default,
			"/migrations/0019_manager_player.sql": _0019_manager_player_default,
			"/migrations/0020_match_stats.sql": _0020_match_stats_default,
			"/migrations/0021_pine_villa_kickoff.sql": _0021_pine_villa_kickoff_default,
			"/migrations/0022_pitch_boards.sql": _0022_pitch_boards_default,
			"/migrations/0023_pitch_kit.sql": _0023_pitch_kit_default,
			"/migrations/0024_match_plans.sql": _0024_match_plans_default,
			"/migrations/0025_match_live.sql": _0025_match_live_default,
			"/migrations/0026_coach_users.sql": _0026_coach_users_default,
			"/migrations/0027_match_half.sql": _0027_match_half_default,
			"/migrations/0028_coach_role.sql": _0028_coach_role_default,
			"/migrations/0029_demo_squad.sql": _0029_demo_squad_default,
			"/migrations/0030_coach_presence.sql": _0030_coach_presence_default,
			"/migrations/0031_presence_ms.sql": _0031_presence_ms_default,
			"/migrations/0032_parent_presence.sql": _0032_parent_presence_default,
			"/migrations/0033_squad_edit.sql": _0033_squad_edit_default,
			"/migrations/0034_perf_submissions.sql": _0034_perf_submissions_default,
			"/migrations/0035_parent_login.sql": _0035_parent_login_default,
			"/migrations/0036_audit_log.sql": _0036_audit_log_default,
			"/migrations/0037_parent_sessions.sql": _0037_parent_sessions_default,
			"/migrations/0038_parent_login_ensure.sql": _0038_parent_login_ensure_default,
			"/migrations/0039_shooting.sql": _0039_shooting_default,
			"/migrations/0040_technique.sql": _0040_technique_default,
			"/migrations/0041_opening_weekend.sql": _0041_opening_weekend_default,
			"/migrations/0042_match_sheets.sql": _0042_match_sheets_default,
			"/migrations/0043_division_fixture_times.sql": _0043_division_fixture_times_default,
			"/migrations/0044_potm_podium.sql": _0044_potm_podium_default
		});
		const done = (await pg.query("select name from _migrations")).rows.map((r) => r.name);
		for (const { name, path } of pendingMigrations(Object.keys(migrations), done)) try {
			await pg.transaction(async (tx) => {
				await tx.exec(migrations[path]);
				await tx.query("insert into _migrations (name) values ($1)", [name]);
			});
		} catch (err) {
			console.error("migration skipped", name, err);
			try {
				await pg.query("insert into _migrations (name) values ($1) on conflict do nothing", [name]);
			} catch {}
		}
	};
	const pass = (globalRef.__pgliteMigrateChain__ ?? Promise.resolve()).catch(() => void 0).then(migrate);
	globalRef.__pgliteMigrateChain__ = pass;
	await pass;
	return toSql(async (text, params) => {
		const prev = globalRef.__pgliteQueryChain__ ?? Promise.resolve();
		let release = () => void 0;
		const gate = new Promise((resolve) => {
			release = resolve;
		});
		globalRef.__pgliteQueryChain__ = prev.then(() => gate, () => gate);
		try {
			await prev;
			return (await pg.query(text, params)).rows;
		} finally {
			release();
		}
	});
}
var sqlPromise = null;
async function createSql() {
	if (typeof window !== "undefined") throw new Error("@/lib/db is server-only — call getSql() from a createServerFn handler or a server route loader, never from client code.");
	return dbSource === "neon" ? createNeonSql() : createPgliteSql();
}
/**
* Get the shared, **server-only** SQL client. Neon when `DATABASE_URL` is set,
* otherwise the local PGLite fallback. Memoized — safe to call per request.
*
* Schema comes from `migrations/*.sql`, auto-applied before the first query on
* both backends — define tables there, never inline in server functions.
*/
function getSql() {
	sqlPromise ??= createSql().catch((err) => {
		sqlPromise = null;
		throw err;
	});
	return sqlPromise;
}
/**
* Finish DB bootstrap before the server handles traffic.
*
* - **PGLite** (preview / no `DATABASE_URL`): open the in-memory DB and apply
*   `migrations/*.sql`. Idempotent — concurrent callers share one promise.
* - **Neon**: no-op (pool is created lazily on first query).
*
* Vite `configureServer` awaits this at dev startup; production imports of this
* module kick it off immediately (see bottom of file).
*/
function ensureDbReady() {
	if (dbSource !== "pglite") return Promise.resolve();
	return getSql().then(() => void 0);
}
var globalBoot = globalThis;
if (typeof window === "undefined" && dbSource === "pglite") globalBoot.__pgBootstrapPromise__ ??= ensureDbReady().catch((err) => {
	globalBoot.__pgBootstrapPromise__ = void 0;
	console.error("[db] PGLite bootstrap failed:", err);
	throw err;
});
//#endregion
export { getSql as t };

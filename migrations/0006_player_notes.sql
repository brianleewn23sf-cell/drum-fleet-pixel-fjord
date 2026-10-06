create table if not exists player_notes (
  player      text primary key,
  note        text not null default '',
  updated_at  timestamptz not null default now()
);

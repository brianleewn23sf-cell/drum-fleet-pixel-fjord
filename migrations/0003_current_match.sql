create table if not exists current_match (
  id           integer primary key check (id = 1),
  game_number  text not null,
  opposition   text not null,
  updated_at   timestamptz not null default now()
);

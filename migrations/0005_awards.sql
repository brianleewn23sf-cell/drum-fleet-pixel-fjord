create table if not exists match_awards (
  id              serial primary key,
  game_number     text not null,
  opposition      text not null,
  opp_mom         text,
  players_player  text,
  updated_at      timestamptz not null default now()
);

create unique index if not exists match_awards_game_idx
  on match_awards (game_number, opposition);

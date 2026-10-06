create table if not exists match_results (
  game_number    text not null,
  opposition     text not null,
  goals_for      integer not null default 0,
  goals_against  integer not null default 0,
  notes          text,
  updated_at     timestamptz not null default now(),
  primary key (game_number, opposition)
);

create table if not exists match_player_stats (
  game_number     text not null,
  opposition      text not null,
  player          text not null,
  goals           integer not null default 0,
  assists         integer not null default 0,
  pre_assists     integer not null default 0,
  shots           integer not null default 0,
  tackles         integer not null default 0,
  interceptions   integer not null default 0,
  blocks          integer not null default 0,
  recoveries      integer not null default 0,
  saves           integer not null default 0,
  catches         integer not null default 0,
  crosses         integer not null default 0,
  dribbles        integer not null default 0,
  fouls           integer not null default 0,
  updated_at      timestamptz not null default now(),
  primary key (game_number, opposition, player)
);

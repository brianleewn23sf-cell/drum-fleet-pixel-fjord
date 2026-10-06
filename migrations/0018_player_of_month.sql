create table if not exists player_of_month (
  month           text primary key,
  player          text not null,
  parent_pts      integer not null default 0,
  training_pts    integer not null default 0,
  opp_mom         integer not null default 0,
  players_player  integer not null default 0,
  total           integer not null default 0,
  awarded_on      text not null,
  created_at      timestamptz not null default now()
);

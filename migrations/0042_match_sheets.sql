alter table league_fixtures add column if not exists status text not null default '';

create table if not exists match_goals (
  id          serial primary key,
  fixture_id  integer not null,
  minute      integer not null default 0,
  scorer      text not null,
  assist      text,
  sort_order  integer not null default 0
);

create table if not exists division_results (
  division    text not null,
  kickoff     text not null,
  home_team   text not null,
  away_team   text not null,
  home_goals  integer not null,
  away_goals  integer not null,
  venue       text not null default '',
  status      text not null default '',
  primary key (division, home_team, away_team, kickoff)
);

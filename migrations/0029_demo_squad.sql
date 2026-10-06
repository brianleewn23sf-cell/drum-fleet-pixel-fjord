create table if not exists demo_players (
  id          integer generated always as identity primary key,
  owner       text not null,
  shirt       text not null default '',
  name        text not null,
  created_at  timestamptz not null default now()
);

create unique index if not exists demo_players_owner_label
  on demo_players (owner, shirt, name);

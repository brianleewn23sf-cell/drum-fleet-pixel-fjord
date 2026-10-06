create table if not exists coach_presence (
  name       text primary key,
  last_seen  timestamptz not null default now()
);

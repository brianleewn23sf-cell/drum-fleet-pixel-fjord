create table if not exists parent_logins (
  player      text primary key,
  pin         text not null unique,
  family      text not null default '',
  created_at  timestamptz not null default now()
);

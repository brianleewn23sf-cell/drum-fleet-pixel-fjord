create table if not exists parent_attempts (
  id            text primary key,
  fails         integer not null default 0,
  locked_until  timestamptz,
  last_at       timestamptz not null default now()
);

create table if not exists parent_sessions (
  token_hash  text primary key,
  player      text not null,
  family      text not null default '',
  expires     timestamptz not null
);

create index if not exists parent_sessions_expires_idx on parent_sessions (expires);

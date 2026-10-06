create table if not exists parent_logins (
  player      text primary key,
  pin         text not null unique,
  family      text not null default '',
  created_at  timestamptz not null default now()
);

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

create table if not exists perf_submissions (
  id              serial primary key,
  player          text not null,
  test_kind       text not null,
  submitted_secs  numeric,
  video_mime      text,
  video_data      text,
  status          text not null default 'pending',
  coach_secs      numeric,
  coach_note      text,
  created_at      timestamptz not null default now(),
  assessed_at     timestamptz
);

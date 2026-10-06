create table if not exists match_live (
  opposition  text not null,
  kickoff     text not null,
  started_at  timestamptz,
  elapsed_ms  integer not null default 0,
  running     boolean not null default false,
  ended       boolean not null default false,
  formation   text not null default '3-3-2',
  lineup      jsonb not null default '{}'::jsonb,
  primary key (opposition, kickoff)
);

create table if not exists match_stints (
  id          serial primary key,
  opposition  text not null,
  kickoff     text not null,
  player      text not null,
  slot_id     text not null,
  on_minute   integer not null,
  off_minute  integer,
  started     boolean not null default false
);

create index if not exists match_stints_game on match_stints (opposition, kickoff);

create table if not exists match_shape_changes (
  id          serial primary key,
  opposition  text not null,
  kickoff     text not null,
  minute      integer not null,
  formation   text not null
);

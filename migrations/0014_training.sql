create table if not exists training_attendance (
  session_date text not null,
  player       text not null,
  attended     integer not null default 0,
  score        integer,
  label        text not null default '',
  updated_at   timestamptz not null default now(),
  primary key (session_date, player)
);

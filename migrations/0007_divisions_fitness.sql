create table if not exists division_standings (
  division  text not null,
  team      text not null,
  played    integer not null default 0,
  won       integer not null default 0,
  drawn     integer not null default 0,
  lost      integer not null default 0,
  gd        integer not null default 0,
  pts       integer not null default 0,
  primary key (division, team)
);

insert into division_standings (division, team) values
  ('north', 'Cherrybrook U12 madrid'),
  ('north', 'Cherrybrook U12 warriors'),
  ('north', 'FS Coaching Academy U12 FS Academy'),
  ('north', 'Golborne Sports Junior U12 Spartans'),
  ('north', 'Ladybridge U12 Lions'),
  ('north', 'Penlake U12 Rangers {Sunday}'),
  ('north', 'Robin Park U12 Rangers'),
  ('north', 'Whittle Hall U12 Titans (Sunday)'),
  ('east', 'Cherrybrook U12 eagles'),
  ('east', 'Cherrybrook U12 hornets'),
  ('east', 'Daisy Hill Junior U12 Titans'),
  ('east', 'Golborne Sports Junior U12 Vikings'),
  ('east', 'Hawkley U12 Hawkley'),
  ('east', 'Highfield Grange U12 ''s Rangers'),
  ('east', 'Hindley Juniors U12 Falcons'),
  ('east', 'Shevington U12 Royals')
on conflict do nothing;

create table if not exists fitness_tests (
  id                 serial primary key,
  player             text not null,
  tested_on          date not null,
  zz50_no_ball       numeric,
  zz50_ball          numeric,
  sprint30_no_ball   numeric,
  sprint30_ball      numeric,
  turns_3x4          numeric,
  created_at         timestamptz not null default now(),
  unique (player, tested_on)
);

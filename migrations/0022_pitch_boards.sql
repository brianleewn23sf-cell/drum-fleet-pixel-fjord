create table if not exists pitch_boards (
  pitch_no   integer primary key check (pitch_no between 1 and 3),
  formation  text not null default '3-3-2',
  lineup     jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

insert into pitch_boards (pitch_no, formation, lineup)
values
  (1, '3-3-2', '{}'::jsonb),
  (2, '3-3-2', '{}'::jsonb),
  (3, '3-3-2', '{}'::jsonb)
on conflict (pitch_no) do nothing;

create table if not exists coach_users (
  id          integer generated always as identity primary key,
  name        text not null,
  pin         text not null unique,
  created_at  timestamptz not null default now()
);

insert into coach_users (name, pin)
values
  ('Brian Lee', '0803'),
  ('Dave Bailey', '123456')
on conflict (pin) do nothing;

create table if not exists fa_sync (
  id          integer primary key,
  last_ok     timestamptz,
  last_error  text
);

insert into fa_sync (id) values (1) on conflict do nothing;

insert into division_standings (division, team)
select 'south', team from (values
  ('Cherrybrook U12 Bulls'),
  ('Cherrybrook U12 cobras'),
  ('Daisy Hill Junior U12 Devils'),
  ('Golborne Sports Junior U12 Gladiators'),
  ('Ladybridge U12 Dynamos'),
  ('Matthiola U12 Atletico (Sun)'),
  ('Newton-Le-Willows U12 Rangers'),
  ('Pine Villa U12 s'),
  ('Robin Park U12 Raptors'),
  ('Standish Panthers Juniors U12 Storm')
) s(team)
on conflict do nothing;

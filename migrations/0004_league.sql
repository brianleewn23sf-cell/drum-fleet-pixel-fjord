create table if not exists league_fixtures (
  id          serial primary key,
  kickoff     text not null,
  home_team   text not null,
  away_team   text not null,
  venue       text not null default '',
  home_goals  integer,
  away_goals  integer
);

insert into league_fixtures (kickoff, home_team, away_team, venue) values
  ('2026-09-06T09:00', 'Pine Villa U12 s', 'Cherrybrook U12 Bulls', 'Albany Academy'),
  ('2026-09-20T09:00', 'Newton-Le-Willows U12 Rangers', 'Cherrybrook U12 Bulls', 'King George V Playing Fields (Newton-le-Willows)'),
  ('2026-09-27T11:15', 'Cherrybrook U12 Bulls', 'Daisy Hill Junior U12 Devils', 'Laithwaite Park Hub P2 (3) 9v9'),
  ('2026-10-04T11:15', 'Standish Panthers Juniors U12 Storm', 'Cherrybrook U12 Bulls', 'Laithwaite Park Hub P2 (2) 9v9'),
  ('2026-10-11T10:00', 'Cherrybrook U12 Bulls', 'Cherrybrook U12 cobras', 'Laithwaite Park Hub P2 (2) 9v9'),
  ('2026-10-18T09:00', 'Robin Park U12 Raptors', 'Cherrybrook U12 Bulls', 'William Fosters Pitch 2 (3) 9v9'),
  ('2026-10-25T10:00', 'Cherrybrook U12 Bulls', 'Ladybridge U12 Dynamos', 'Laithwaite Park Hub P2 (3) 9v9'),
  ('2026-11-01T09:00', 'Matthiola U12 Atletico (Sun)', 'Cherrybrook U12 Bulls', 'The Oaks (Risley)'),
  ('2026-11-22T10:00', 'Cherrybrook U12 Bulls', 'Newton-Le-Willows U12 Rangers', 'Laithwaite Park Hub P2 (2) 9v9'),
  ('2026-11-29T09:00', 'Daisy Hill Junior U12 Devils', 'Cherrybrook U12 Bulls', 'Daisy Hill Juniors FC'),
  ('2026-12-13T08:45', 'Cherrybrook U12 cobras', 'Cherrybrook U12 Bulls', 'Laithwaite Park Hub P2 (3) 9v9'),
  ('2027-01-10T10:00', 'Cherrybrook U12 Bulls', 'Robin Park U12 Raptors', 'Laithwaite Park Hub P2 (3) 9v9'),
  ('2027-01-17T09:00', 'Ladybridge U12 Dynamos', 'Cherrybrook U12 Bulls', 'Ladybridge Lane'),
  ('2027-01-24T08:45', 'Cherrybrook U12 Bulls', 'Matthiola U12 Atletico (Sun)', 'Laithwaite Park Hub P2 (3) 9v9'),
  ('2027-01-31T08:45', 'Cherrybrook U12 Bulls', 'Golborne Sports Junior U12 Gladiators', 'Laithwaite Park Hub P2 (3) 9v9'),
  ('2027-02-07T11:30', 'Golborne Sports Junior U12 Gladiators', 'Cherrybrook U12 Bulls', 'William Fosters Pitch 2 (3) 9v9'),
  ('2027-02-28T08:45', 'Cherrybrook U12 Bulls', 'Standish Panthers Juniors U12 Storm', 'Laithwaite Park Hub P2 (2) 9v9'),
  ('2027-03-21T08:45', 'Cherrybrook U12 Bulls', 'Pine Villa U12 s', 'Laithwaite Park Hub P2 (3) 9v9');

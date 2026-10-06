delete from division_standings where division = 'west';

insert into division_standings (division, team) values
  ('west', 'Cherrybrook U12 Knights'),
  ('west', 'Cherrybrook U12 robins'),
  ('west', 'Cherrybrook U12 raiders'),
  ('west', 'FC Wigan U12 FC Wigan Warriors'),
  ('west', 'Golborne Sports Junior U12 Falcons'),
  ('west', 'Bolton Lads & Girls Club U12 BLGC Lions'),
  ('west', 'Standish Panthers Juniors U12 Lightning'),
  ('west', 'Hindley Juniors U12 Jaguars'),
  ('west', 'Appley Bridge U12'),
  ('west', 'F.C. Britannia (Wigan) U12 Yellow'),
  ('west', 'Leigh Genesis U12 Formation')
on conflict do nothing;

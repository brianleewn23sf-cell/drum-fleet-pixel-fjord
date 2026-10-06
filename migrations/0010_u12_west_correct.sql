delete from division_standings where division = 'west';

insert into division_standings (division, team) values
  ('west', 'Appley Bridge U12'),
  ('west', 'Bolton Lads & Girls Club U12 BLGC Lions'),
  ('west', 'Cherrybrook U12 Knights'),
  ('west', 'Cherrybrook U12 hurricanes'),
  ('west', 'Cherrybrook U12 raiders'),
  ('west', 'F.C. Britannia (Wigan) U12 Blue'),
  ('west', 'F.C. Britannia (Wigan) U12 Whites'),
  ('west', 'F.C. Britannia (Wigan) U12 Yellow'),
  ('west', 'Standish Panthers Juniors U12 Lightning'),
  ('west', 'Winwick Spartans U12 Sharks')
on conflict do nothing;

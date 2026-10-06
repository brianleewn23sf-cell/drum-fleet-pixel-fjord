insert into division_standings (division, team) values
  ('west', 'Ladybridge U12 Leopards'),
  ('west', 'Highfield Grange U12 ''s Athletic'),
  ('west', 'Pine Villa U12 Tangerine'),
  ('west', 'Clay Brow Clay Brow Athletico U12'),
  ('west', 'Astley & Tyldesley J.F.C. U12 Typhoons'),
  ('west', 'Golborne Sports Junior U12 Jaguars'),
  ('west', 'Appley Bridge U12'),
  ('west', 'Shevington U12 Sky'),
  ('west', 'Golborne Sports Junior U12 Pumas'),
  ('west', 'JFC Chorley U12 JFC Chorley Reds'),
  ('west', 'Hindley Green U12')
on conflict do nothing;

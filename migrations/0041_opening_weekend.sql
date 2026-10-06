update league_fixtures
set home_goals = 7, away_goals = 6
where home_team = 'Pine Villa U12 s'
  and away_team = 'Cherrybrook U12 Bulls'
  and home_goals is null
  and away_goals is null;

update division_standings
set played = 1, won = 1, drawn = 0, lost = 0, gd = 1, pts = 3
where division = 'north' and team = 'Robin Park U12 Rangers' and played = 0;

update division_standings
set played = 1, won = 0, drawn = 0, lost = 1, gd = -1, pts = 0
where division = 'north' and team = 'Whittle Hall U12 Titans (Sunday)' and played = 0;

update division_standings
set played = 1, won = 1, drawn = 0, lost = 0, gd = 7, pts = 3
where division = 'east' and team = 'Hawkley U12 Hawkley' and played = 0;

update division_standings
set played = 1, won = 1, drawn = 0, lost = 0, gd = 6, pts = 3
where division = 'east' and team = 'Hindley Juniors U12 Falcons' and played = 0;

update division_standings
set played = 1, won = 1, drawn = 0, lost = 0, gd = 4, pts = 3
where division = 'east' and team = 'Cherrybrook U12 hornets' and played = 0;

update division_standings
set played = 1, won = 1, drawn = 0, lost = 0, gd = 1, pts = 3
where division = 'east' and team = 'Highfield Grange U12 ''s Rangers' and played = 0;

update division_standings
set played = 1, won = 0, drawn = 0, lost = 1, gd = -1, pts = 0
where division = 'east' and team = 'Cherrybrook U12 eagles' and played = 0;

update division_standings
set played = 1, won = 0, drawn = 0, lost = 1, gd = -4, pts = 0
where division = 'east' and team = 'Shevington U12 Royals' and played = 0;

update division_standings
set played = 1, won = 0, drawn = 0, lost = 1, gd = -6, pts = 0
where division = 'east' and team = 'Daisy Hill Junior U12 Titans' and played = 0;

update division_standings
set played = 1, won = 0, drawn = 0, lost = 1, gd = -7, pts = 0
where division = 'east' and team = 'Golborne Sports Junior U12 Vikings' and played = 0;

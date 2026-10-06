update league_fixtures
set kickoff = '2026-09-06T11:00'
where kickoff like '2026-09-06%'
  and (
    (home_team ilike '%Pine Villa%' and away_team ilike '%Bulls%')
    or (away_team ilike '%Pine Villa%' and home_team ilike '%Bulls%')
  );

drop index if exists votes_game_voter_idx;

create unique index if not exists votes_game_opp_voter_idx
  on votes (lower(btrim(game_number)), lower(btrim(opposition)), lower(btrim(voter_child)));

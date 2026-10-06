create table if not exists votes (
  id           serial primary key,
  game_number  text not null,
  opposition   text not null,
  voter_child  text not null,
  vote_3       text not null,
  vote_2       text not null,
  vote_1       text not null,
  created_at   timestamptz not null default now()
);

create unique index if not exists votes_game_voter_idx
  on votes (lower(btrim(game_number)), lower(btrim(voter_child)));

create index if not exists votes_created_at_idx on votes (created_at desc);

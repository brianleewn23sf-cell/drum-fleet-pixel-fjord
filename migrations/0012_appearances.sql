create table if not exists match_appearances (
  game_number text not null,
  opposition  text not null,
  player      text not null,
  primary key (game_number, opposition, player)
);

create table if not exists squad_removed (
  player text primary key
);

create table if not exists squad_added (
  id      integer generated always as identity primary key,
  shirt   text not null default '',
  name    text not null,
  unique (shirt, name)
);

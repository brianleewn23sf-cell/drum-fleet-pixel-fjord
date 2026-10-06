create table if not exists parent_presence (
  id            text primary key,
  child         text not null default '',
  page          text not null default '',
  last_seen_ms  bigint not null
);

create table if not exists audit_log (
  id      serial primary key,
  at      timestamptz not null default now(),
  actor   text not null,
  role    text not null default '',
  action  text not null,
  detail  text not null default '',
  player  text
);

create index if not exists audit_log_at_idx on audit_log (at desc);

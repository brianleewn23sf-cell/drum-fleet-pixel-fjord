alter table match_live add column if not exists half integer not null default 1;
alter table match_live add column if not exists half_mark_ms integer not null default 0;

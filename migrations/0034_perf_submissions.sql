create table if not exists perf_submissions (
  id              serial primary key,
  player          text not null,
  test_kind       text not null,
  submitted_secs  numeric,
  video_mime      text,
  video_data      text,
  status          text not null default 'pending',
  coach_secs      numeric,
  coach_note      text,
  created_at      timestamptz not null default now(),
  assessed_at     timestamptz
);

create index if not exists perf_submissions_player_idx on perf_submissions (player, created_at desc);
create index if not exists perf_submissions_status_idx on perf_submissions (status, created_at desc);

create table if not exists match_plans (
  opposition  text not null,
  kickoff     text not null,
  venue       text,
  home        boolean not null default true,
  formation   text not null default '3-3-2',
  kit         text not null default 'home',
  lineup      jsonb not null default '{}'::jsonb,
  brief       jsonb not null default '{}'::jsonb,
  updated_at  timestamptz not null default now(),
  primary key (opposition, kickoff)
);

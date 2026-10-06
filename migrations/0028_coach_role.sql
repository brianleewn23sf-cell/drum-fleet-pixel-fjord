alter table coach_users add column if not exists role text not null default 'coach';

update coach_users
set role = 'admin'
where pin = '0803' or name = 'Brian Lee';

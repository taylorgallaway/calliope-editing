-- Run this once in Supabase → SQL Editor → New query → Run

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  service text,
  genre text,
  age_category text,
  word_count text,
  start_date text,
  style_guide text,
  message text,
  wants_sample boolean not null default false,
  status text not null default 'new'
);

-- Lock the table down: only the website's server (using the service role key) can write to it.
-- Nobody can read or edit inquiries from the browser.
alter table public.inquiries enable row level security;

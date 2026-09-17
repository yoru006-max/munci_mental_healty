create table if not exists public.users (
  id uuid primary key,
  email text unique not null,
  name text not null,
  role text not null default 'user',
  created_at timestamptz not null default now()
);

create table if not exists public.books (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.users(id) on delete cascade,
  title text not null,
  author text not null,
  category text not null default 'General',
  description text not null default '',
  file_name text not null,
  file_url text not null,
  file_type text not null,
  format text not null,
  visibility text not null default 'private' check (visibility in ('private', 'public')),
  cover_image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.book_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  book_id uuid not null references public.books(id) on delete cascade,
  current_page integer not null default 0,
  percentage numeric not null default 0,
  updated_at timestamptz not null default now(),
  unique (user_id, book_id)
);

create policy "Users can view their own books"
on public.books for select
using (owner_id = auth.uid());

create policy "Users can view public books"
on public.books for select
using (visibility = 'public');

create policy "Users can insert their own books"
on public.books for insert
with check (owner_id = auth.uid());

create policy "Users can update their own books"
on public.books for update
using (owner_id = auth.uid());

create policy "Users can delete their own books"
on public.books for delete
using (owner_id = auth.uid());

create policy "Users can manage own progress"
on public.book_progress for all
using (user_id = auth.uid());

create policy "Storage books accessible to uploader or public"
on storage.objects for select
using (bucket_id = 'books' and (storage.foldername(name)[1] = auth.uid()::text or true));

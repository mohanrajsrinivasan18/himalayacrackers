
alter table products enable row level security;
create policy "Public read" on products for select using (is_active = true);

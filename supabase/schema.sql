
-- USERS
create table users (
  id uuid primary key,
  role text default 'staff',
  created_at timestamp default now()
);

-- PRODUCTS
create table products (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  price numeric not null,
  stock int default 0,
  low_stock_threshold int default 20,
  is_active boolean default true,
  per text default 'pkt',
  created_at timestamp default now()
);

-- ENQUIRIES
create table enquiries (
  id uuid primary key default uuid_generate_v4(),
  enquiry_number text unique,
  user_name text,
  phone text,
  address text,
  pincode text,
  status text default 'Received',
  payment_method text,
  invoice_no text,
  created_at timestamp default now()
);

-- ORDERS
create table orders (
  id uuid primary key default uuid_generate_v4(),
  enquiry_id uuid references enquiries(id),
  product_id uuid references products(id),
  quantity int,
  unit_price numeric
);

-- FESTIVAL PRICING
create table festival_pricing (
  id uuid primary key default uuid_generate_v4(),
  festival_name text,
  price_multiplier numeric,
  start_date date,
  end_date date,
  is_active boolean default false
);

-- INVOICE COUNTER
create table invoice_counter (
  id int primary key,
  current_number int
);

insert into invoice_counter values (1, 0);

-- ENQUIRY COUNTER
create table enquiry_counter (
  id int primary key,
  current_number int
);

insert into enquiry_counter values (1, 0);

-- Function to generate enquiry number
create or replace function generate_enquiry_number()
returns text as $$
declare
  new_number int;
  enquiry_num text;
begin
  update enquiry_counter set current_number = current_number + 1 where id = 1 returning current_number into new_number;
  enquiry_num := 'ENQ' || to_char(now(), 'YYYY') || lpad(new_number::text, 6, '0');
  return enquiry_num;
end;
$$ language plpgsql;

-- Trigger to auto-generate enquiry number
create or replace function set_enquiry_number()
returns trigger as $$
begin
  if new.enquiry_number is null then
    new.enquiry_number := generate_enquiry_number();
  end if;
  return new;
end;
$$ language plpgsql;

create trigger before_insert_enquiry
  before insert on enquiries
  for each row
  execute function set_enquiry_number();

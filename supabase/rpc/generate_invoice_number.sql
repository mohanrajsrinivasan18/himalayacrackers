
create or replace function generate_invoice_number()
returns text
language plpgsql
as $$
declare n int;
begin
  update invoice_counter set current_number = current_number + 1 where id=1 returning current_number into n;
  return 'HC-' || extract(year from now()) || '-' || lpad(n::text, 6, '0');
end;
$$;

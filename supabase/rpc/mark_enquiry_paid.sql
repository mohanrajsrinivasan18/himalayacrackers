
create or replace function mark_enquiry_paid(enquiry_id uuid)
returns void
language plpgsql
as $$
begin
  update enquiries set status='Paid' where id=enquiry_id;
  update products p
  set stock = stock - o.quantity
  from orders o
  where o.product_id = p.id and o.enquiry_id = enquiry_id;
end;
$$;

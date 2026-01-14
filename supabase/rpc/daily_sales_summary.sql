
create or replace function daily_sales_summary()
returns table (
  total_enquiries int,
  total_revenue numeric
)
language sql
as $$
  select count(*), coalesce(sum(quantity * unit_price),0)
  from enquiries e join orders o on e.id=o.enquiry_id
  where date(e.created_at)=current_date and e.status='Paid';
$$;

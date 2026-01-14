import { supabaseAdmin } from "@/lib/supabaseAdmin";

export default async function handler(req, res) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayISO = today.toISOString();

  const [
    productsRes,
    lowStockRes,
    todayEnquiriesRes,
    summaryRes
  ] = await Promise.all([
    supabaseAdmin.from("products").select("id", { count: "exact" }),
    supabaseAdmin
      .from("products")
      .select("id", { count: "exact" })
      .lt("stock", 5),
    supabaseAdmin
      .from("enquiries")
      .select("id", { count: "exact" })
      .gte("created_at", todayISO),
    supabaseAdmin.rpc("dashboard_enquiry_summary", {
      today_date: todayISO
    })
  ]);

  if (
    productsRes.error ||
    lowStockRes.error ||
    todayEnquiriesRes.error ||
    summaryRes.error
  ) {
    return res.status(500).json({ error: "Dashboard fetch failed" });
  }

  res.status(200).json({
    productCount: productsRes.count,
    lowStockCount: lowStockRes.count,
    todayEnquiries: todayEnquiriesRes.count,

    today_count: summaryRes.data[0].today_count,
    pending_count: summaryRes.data[0].pending_count,
    paid_count: summaryRes.data[0].paid_count
  });
}
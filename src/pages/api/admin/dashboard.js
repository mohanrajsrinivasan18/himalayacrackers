import { supabaseAdmin } from "@/lib/supabaseAdmin";

export default async function handler(req, res) {
  try {
    // Total products
    const { count: productCount } = await supabaseAdmin
      .from("products")
      .select("*", { count: "exact", head: true });

    // Low stock products (<= 5)
    const { count: lowStockCount } = await supabaseAdmin
      .from("products")
      .select("*", { count: "exact", head: true })
      .lte("stock", 5);

    // Today enquiries
    const today = new Date().toISOString().split("T")[0];

    const { count: todayEnquiries } = await supabaseAdmin
      .from("enquiries")
      .select("*", { count: "exact", head: true })
      .gte("created_at", today);

    res.json({
      productCount: productCount || 0,
      lowStockCount: lowStockCount || 0,
      todayEnquiries: todayEnquiries || 0
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Dashboard fetch failed" });
  }
}

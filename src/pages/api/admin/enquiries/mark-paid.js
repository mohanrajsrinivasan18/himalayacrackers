import { supabaseAdmin } from "@/lib/supabaseAdmin";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { enquiry_id } = req.body;

  if (!enquiry_id) {
    return res.status(400).json({ error: "Missing enquiry_id" });
  }

  // 1️⃣ Fetch enquiry orders
  const { data: orders, error: ordersError } = await supabaseAdmin
    .from("orders")
    .select("product_id, quantity")
    .eq("enquiry_id", enquiry_id);

  if (ordersError) {
    return res.status(500).json({ error: ordersError.message });
  }

  if (!orders.length) {
    return res.status(400).json({ error: "No orders found" });
  }

  // 2️⃣ Deduct stock (transaction-like)
  for (const o of orders) {
    const { error: stockError } = await supabaseAdmin.rpc(
      "deduct_stock",
      {
        p_product_id: o.product_id,
        p_qty: o.quantity
      }
    );

    if (stockError) {
      return res.status(500).json({ error: stockError.message });
    }
  }

  // 3️⃣ Update enquiry status
  const { error: statusError } = await supabaseAdmin
    .from("enquiries")
    .update({ status: "Paid" })
    .eq("id", enquiry_id);

  if (statusError) {
    return res.status(500).json({ error: statusError.message });
  }

  res.status(200).json({ success: true });
}

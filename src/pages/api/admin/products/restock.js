import { supabaseAdmin } from "@/lib/supabaseAdmin";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { product_id, quantity, reason } = req.body;

  if (!product_id || !quantity || quantity <= 0) {
    return res.status(400).json({ error: "Invalid restock data" });
  }

  // 1️⃣ Increase stock
  const { error: stockError } = await supabaseAdmin.rpc(
    "increase_stock",
    {
      p_product_id: product_id,
      p_qty: quantity
    }
  );

  if (stockError) {
    return res.status(500).json({ error: stockError.message });
  }

  // 2️⃣ Log inventory transaction
  const { error: logError } = await supabaseAdmin
    .from("inventory_transactions")
    .insert({
      product_id,
      type: "IN",
      quantity,
      reason: reason || "Manual restock"
    });

  if (logError) {
    return res.status(500).json({ error: logError.message });
  }

  res.status(200).json({ success: true });
}

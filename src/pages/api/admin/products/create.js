import { supabaseAdmin } from "@/lib/supabaseAdmin";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, per, mrp, price, stock, category_slug } = req.body;

  if (!name || !per || !price || !stock) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const { data, error } = await supabaseAdmin
    .from("products")
    .insert([
      {
        name,
        per,
        mrp,
        price,
        stock,
        category_slug
      }
    ])
    .select()
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  // ✅ IMPORTANT RESPONSE SHAPE
  res.status(200).json({
    success: true,
    product: data
  });
}

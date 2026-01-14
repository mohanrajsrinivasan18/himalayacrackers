import { supabaseAdmin } from "@/lib/supabaseAdmin";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { product_id, imageUrl } = req.body;

  if (!product_id || !imageUrl) {
    return res.status(400).json({ error: "Invalid payload" });
  }

  const { data: product, error } = await supabaseAdmin
    .from("products")
    .select("images")
    .eq("id", product_id)
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  const images = [...(product.images || []), imageUrl];

  const { error: updateErr } = await supabaseAdmin
    .from("products")
    .update({ images })
    .eq("id", product_id);

  if (updateErr) {
    return res.status(500).json({ error: updateErr.message });
  }

  res.status(200).json({ success: true, images });
}

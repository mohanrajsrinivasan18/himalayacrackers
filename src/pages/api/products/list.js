import { supabaseAdmin } from "@/lib/supabaseAdmin";

export default async function handler(req, res) {
  const { data, error } = await supabaseAdmin
    .from("products")
    .select(`
      id,
      name,
      per,
      price,
      mrp,
      discount_percent,
      stock,
      image,
      category_slug,
      is_active
    `)
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json(data);
}

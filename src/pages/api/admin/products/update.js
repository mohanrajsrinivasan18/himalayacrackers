import { supabaseAdmin } from "@/lib/supabaseAdmin";

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { id, name, per, mrp, price, stock, category_slug } = req.body;

  if (!id || !name || !per || !mrp || !price || stock === undefined) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const { data, error } = await supabaseAdmin
      .from("products")
      .update({
        name,
        per,
        mrp,
        price,
        stock,
        category_slug
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Update error:", error);
      return res.status(500).json({ error: error.message });
    }

    res.json({ success: true, product: data });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}
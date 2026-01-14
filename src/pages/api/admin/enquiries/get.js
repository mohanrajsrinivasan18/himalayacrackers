import { supabaseAdmin } from "@/lib/supabaseAdmin";

export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "Missing id" });
  }

  const { data, error } = await supabaseAdmin
    .from("enquiries")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json(data);
}

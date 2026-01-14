import { supabaseAdmin } from "@/lib/supabaseAdmin";

export default async function handler(req, res) {
  const { enquiry_id } = req.query;

  if (!enquiry_id) {
    return res.status(400).json({ error: "Missing enquiry_id" });
  }

  const { data, error } = await supabaseAdmin
    .from("enquiry_activity")
    .select("*")
    .eq("enquiry_id", enquiry_id)
    .order("created_at", { ascending: false });

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json(data);
}

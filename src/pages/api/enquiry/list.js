
import { supabaseAdmin } from "@/lib/supabaseClient";
export default async function handler(req, res) {
  const { data } = await supabaseAdmin.from("enquiries").select("*").order("created_at", { ascending: false });
  res.status(200).json(data);
}

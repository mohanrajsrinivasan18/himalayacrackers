
import { supabaseAdmin } from "@/lib/supabaseClient";

export default async function handler(req, res) {
  const { data } = await supabaseAdmin.rpc("daily_sales_summary");
  res.status(200).json(data?.[0]);
}

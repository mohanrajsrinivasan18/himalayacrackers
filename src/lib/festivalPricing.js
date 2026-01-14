
import { supabaseAdmin } from "./supabaseClient";

export async function getFestivalMultiplier() {
  const today = new Date().toISOString().slice(0,10);
  const { data } = await supabaseAdmin
    .from("festival_pricing")
    .select("price_multiplier")
    .eq("is_active", true)
    .lte("start_date", today)
    .gte("end_date", today)
    .single();
  return data?.price_multiplier || 1;
}

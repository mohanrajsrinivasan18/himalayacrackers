
import { supabaseAdmin } from "./supabaseAdmin";

export async function checkLowStock() {
  const { data: products } = await supabaseAdmin
    .from("products")
    .select("name, stock, low_stock_threshold")
    .lte("stock", "low_stock_threshold");

  return products;
}

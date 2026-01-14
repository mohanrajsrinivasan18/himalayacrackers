import { supabase } from "@/lib/supabaseClient";

export async function uploadProductImages(files, productId) {
  const urls = [];

  for (const file of files) {
    const path = `${productId}/${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from("products")
      .upload(path, file);

    if (error) throw error;

    const { data } = supabase.storage
      .from("products")
      .getPublicUrl(path);

    urls.push(data.publicUrl);
  }

  await supabase
    .from("products")
    .update({ images: urls })
    .eq("id", productId);

  return urls;
}

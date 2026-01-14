import { supabaseAdmin } from "@/lib/supabaseAdmin";
import formidable from "formidable";
import fs from "fs";

export const config = {
  api: { bodyParser: false }
};

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const productId = req.query.productId;
  if (!productId) {
    return res.status(400).json({ error: "Missing productId" });
  }

  const form = formidable({
    multiples: false,
    maxFileSize: 5 * 1024 * 1024, // 5MB
    keepExtensions: true
  });

  form.parse(req, async (err, fields, files) => {
    try {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      // ✅ FORMIDABLE v2 FIX
      const uploaded = files.file;
      if (!uploaded || !uploaded.length) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const file = uploaded[0]; // ← CRITICAL FIX

      const buffer = fs.readFileSync(file.filepath);
      const ext = file.originalFilename.split(".").pop();
      const filePath = `${productId}/${Date.now()}.${ext}`;

      const { error: uploadError } = await supabaseAdmin.storage
        .from("products")
        .upload(filePath, buffer, {
          contentType: file.mimetype,
          upsert: true
        });

      if (uploadError) {
        return res.status(500).json({ error: uploadError.message });
      }

      const publicUrl =
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}` +
        `/storage/v1/object/public/products/${filePath}`;

      const { error: dbError } = await supabaseAdmin
        .from("products")
        .update({ image: publicUrl })
        .eq("id", productId);

      if (dbError) {
        return res.status(500).json({ error: dbError.message });
      }

      return res.status(200).json({
        success: true,
        url: publicUrl
      });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  });
}

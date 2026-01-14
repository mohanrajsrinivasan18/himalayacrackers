import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { generatePdfFromHtml } from "@/lib/pdf";

export default async function handler(req, res) {
  const { enquiry_id } = req.query;

  if (!enquiry_id) {
    return res.status(400).json({ error: "Missing enquiry_id" });
  }

  const { data: enquiry } = await supabaseAdmin
    .from("enquiries")
    .select("*")
    .eq("id", enquiry_id)
    .single();

  if (!enquiry) {
    return res.status(404).json({ error: "Enquiry not found" });
  }

  const pdfUrl = await generatePdfFromHtml(enquiry);

  res.status(200).json({ pdfUrl });
}

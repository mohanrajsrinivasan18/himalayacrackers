import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { logEnquiryActivity } from "@/lib/logEnquiryActivity";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { enquiry_id, items } = req.body;

  if (!enquiry_id || !Array.isArray(items)) {
    return res.status(400).json({ error: "Invalid payload" });
  }

  // 1️⃣ Fetch enquiry status
  const { data: enquiry, error: fetchErr } = await supabaseAdmin
    .from("enquiries")
    .select("status")
    .eq("id", enquiry_id)
    .single();

  if (fetchErr || !enquiry) {
    return res.status(404).json({ error: "Enquiry not found" });
  }

  // 2️⃣ BLOCK updates if PAID / DELIVERED
  if (enquiry.status === "PAID" || enquiry.status === "DELIVERED") {
    return res.status(403).json({
      error: "Cannot modify items after payment"
    });
  }

  // 3️⃣ Recalculate total safely
  const total = items.reduce(
    (sum, i) => sum + Number(i.price) * Number(i.qty),
    0
  );

  // 4️⃣ Update enquiry items + total
  const { error: updateErr } = await supabaseAdmin
    .from("enquiries")
    .update({
      items,
      total
    })
    .eq("id", enquiry_id);

  if (updateErr) {
    return res.status(500).json({ error: updateErr.message });
  }

  await logEnquiryActivity(enquiry_id, "ITEMS_UPDATED", {
    item_count: items.length,
    total
  });

  res.status(200).json({ success: true });
}

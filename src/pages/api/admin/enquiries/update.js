import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { logEnquiryActivity } from "@/lib/logEnquiryActivity";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { enquiry_id, status, admin_note } = req.body;

  if (!enquiry_id || !status) {
    return res.status(400).json({ error: "Invalid payload" });
  }

  // 1️⃣ Fetch current enquiry
  const { data: enquiry, error: fetchErr } = await supabaseAdmin
    .from("enquiries")
    .select("status, items, admin_note")
    .eq("id", enquiry_id)
    .single();

  if (fetchErr || !enquiry) {
    return res.status(404).json({ error: "Enquiry not found" });
  }

  const prevStatus = enquiry.status;
  const prevNote = enquiry.admin_note || "";

  const isStatusChanged = prevStatus !== status;
  const isNoteChanged = (admin_note || "") !== prevNote;

  const wasPaid = prevStatus === "PAID";
  const isNowPaid = status === "PAID";

  // 2️⃣ Deduct stock if transitioning to PAID
  if (!wasPaid && isNowPaid) {
    for (const item of enquiry.items || []) {
      const { error: stockErr } = await supabaseAdmin.rpc(
        "deduct_product_stock",
        {
          p_product_id: item.id,
          p_qty: item.qty
        }
      );

      if (stockErr) {
        return res.status(400).json({
          error: `Stock issue for ${item.name}: ${stockErr.message}`
        });
      }
    }

    await logEnquiryActivity(enquiry_id, "PAYMENT_CONFIRMED", {
      total: enquiry.items?.reduce(
        (sum, i) => sum + i.qty * i.price,
        0
      )
    });
  }

  // 3️⃣ Update enquiry
  const { error: updateErr } = await supabaseAdmin
    .from("enquiries")
    .update({
      status,
      admin_note
    })
    .eq("id", enquiry_id);

  if (updateErr) {
    return res.status(500).json({ error: updateErr.message });
  }

  // 4️⃣ Log status change
  if (isStatusChanged) {
    await logEnquiryActivity(enquiry_id, "STATUS_CHANGED", {
      from: prevStatus,
      to: status
    });
  }

  // 5️⃣ Log admin note update
  if (isNoteChanged) {
    await logEnquiryActivity(enquiry_id, "ADMIN_NOTE_UPDATED");
  }

  res.status(200).json({ success: true });
}

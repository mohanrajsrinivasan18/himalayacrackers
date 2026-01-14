
import { supabaseAdmin } from "@/lib/supabaseAdmin";
export default async function handler(req, res) {
  const { enquiryId, status } = req.body;
  if (status === "Paid") {
    await supabaseAdmin.rpc("mark_enquiry_paid", { enquiry_id: enquiryId });
  } else {
    await supabaseAdmin.from("enquiries").update({ status }).eq("id", enquiryId);
  }
  res.status(200).json({ success: true });
}

import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function logEnquiryActivity(enquiry_id, action, meta = {}) {
  await supabaseAdmin.from("enquiry_activity").insert({
    enquiry_id,
    action,
    meta
  });
}

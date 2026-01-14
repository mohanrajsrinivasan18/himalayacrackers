import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { logEnquiryActivity } from "@/lib/logEnquiryActivity";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const {
      name,
      phone,
      address,
      pincode,
      customer_note,
      items
    } = req.body;

    if (!name || !phone || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Invalid enquiry data" });
    }

    const total = items.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );

    const { data: enquiry, error } = await supabaseAdmin
      .from("enquiries")
      .insert({
        customer_name: name,
        phone,
        address,
        pincode,
        customer_note,
        status: "RECEIVED",
        items,
        total
      })
      .select()
      .single();

    if (error) {
      console.error("SUPABASE ERROR:", error);
      return res.status(500).json({ error: error.message });
    }

    await logEnquiryActivity(enquiry.id, "ENQUIRY_CREATED", {
      total: enquiry.total
    })

    return res.status(200).json({
      success: true,
      enquiry_id: enquiry.id
    });
  } catch (err) {
    console.error("API ERROR:", err);
    return res.status(500).json({ error: "Server error" });
  }
}

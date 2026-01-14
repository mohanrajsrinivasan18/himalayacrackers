import { supabaseAdmin } from "@/lib/supabaseAdmin";

export default async function handler(req, res) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayISO = today.toISOString();

  const { data, error } = await supabaseAdmin.rpc(
    "dashboard_enquiry_summary",
    { today_date: todayISO }
  );

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json(data[0]);
}

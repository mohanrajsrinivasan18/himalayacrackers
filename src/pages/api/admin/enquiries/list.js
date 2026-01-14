import { supabaseAdmin } from "@/lib/supabaseAdmin";

export default async function handler(req, res) {
  console.log("ADMIN ENQUIRIES API HIT");
  console.log("supabaseAdmin value:", supabaseAdmin);

  if (req.method !== "GET") {
    console.log("INVALID METHOD:", req.method);
    return res.status(405).json({ error: "Method not allowed" });
  }

  console.log("ABOUT TO QUERY TABLE: enquiries");

  const { data, error } = await supabaseAdmin
    .from("enquiries") // or "enquiry" if singular
    .select("*")
    .order("created_at", { ascending: false });

  console.log("QUERY RESULT:", { data, error });

  if (error) {
    console.error("SUPABASE ERROR:", error);
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json(data);
}

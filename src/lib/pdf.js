export async function generatePdfFromHtml(enquiry) {
  const res = await fetch("https://api.pdfshift.io/v3/convert/pdf", {
    method: "POST",
    headers: {
      "Authorization":
        "Basic " +
        Buffer.from(
          `api:${process.env.PDFSHIFT_API_KEY}`
        ).toString("base64"),
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      source: `${process.env.NEXT_PUBLIC_SITE_URL}/print/${enquiry.id}`,
      landscape: false,
      use_print: false
    })
  });

  const buffer = await res.arrayBuffer();
  const blob = Buffer.from(buffer);

  // In real app: upload to Supabase storage
  // For now: return temp URL
  return `data:application/pdf;base64,${blob.toString("base64")}`;
}

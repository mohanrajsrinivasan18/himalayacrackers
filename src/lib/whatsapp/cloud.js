export async function sendViaCloudAPI(enquiry) {
  if (!process.env.WHATSAPP_CLOUD_ENABLED) {
    throw new Error("WhatsApp Cloud API not enabled");
  }

  const res = await fetch("/api/whatsapp/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      phone: enquiry.phone,
      enquiry_id: enquiry.id
    })
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "WhatsApp API failed");
  }

  return true;
}

export function buildWhatsAppSummary(enquiry) {
  const count = enquiry.items?.length || 0;

  return encodeURIComponent(
`Hi ${enquiry.customer_name} 👋

Thank you for contacting *Himalaya Crackers* 🎆

🧾 Enquiry Ref: ${enquiry.id.slice(0, 6)}
📦 Items: ${count}
💰 Total: ₹${enquiry.total}

Our team will assist you shortly.

– Himalaya Crackers`
  );
}

export function openManualWhatsApp(enquiry) {
  const msg = buildWhatsAppSummary(enquiry);
  const phone = enquiry.phone.replace(/\D/g, "");

  window.open(
    `https://wa.me/91${phone}?text=${msg}`,
    "_blank"
  );

  return true;
}

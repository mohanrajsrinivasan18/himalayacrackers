export function enquiryMessage(enquiry) {
  return `
🧨 *Himalaya Crackers*

Hello ${enquiry.name},
We received your enquiry.

Total: ₹${enquiry.total}

Our team will contact you shortly.
`;
}
  
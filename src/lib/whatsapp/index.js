import { openManualWhatsApp } from "./manual";
import { sendViaCloudAPI } from "./cloud";

export async function sendWhatsApp(enquiry) {
  const mode = process.env.NEXT_PUBLIC_WHATSAPP_MODE;

  if (!enquiry?.phone) {
    throw new Error("Customer phone number missing");
  }

  if (mode === "CLOUD_API") {
    return sendViaCloudAPI(enquiry);
  }

  if (mode === "MANUAL") {
    return openManualWhatsApp(enquiry);
  }

  throw new Error("WhatsApp is disabled");
}

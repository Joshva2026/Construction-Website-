import { EnquiryFormData } from "./validation";

/**
 * Builds a readable plain-text construction enquiry message suitable for WhatsApp and Email.
 */
export function formatEnquiryMessage(data: EnquiryFormData, companyName: string): string {
  const parts: string[] = [
    `*New Project Enquiry for ${companyName}*`,
    `----------------------------------------`,
    `*Client Name:* ${data.name}`,
    `*Phone:* ${data.phone}`,
    data.email ? `*Email:* ${data.email}` : "",
    `*Project Type:* ${data.projectType}`,
    `*Preferred Contact Method:* ${data.preferredContact}`,
    `----------------------------------------`,
    `*Project Details / Message:*`,
    data.message,
    `----------------------------------------`,
    `_Sent via online construction enquiry form_`,
  ];

  return parts.filter(Boolean).join("\n");
}

/**
 * Builds the WhatsApp direct chat link with pre-filled encoded enquiry text.
 * @param whatsappNumber Phone number in international format without '+' or spaces (e.g. 919876543210)
 */
export function buildWhatsAppUrl(
  whatsappNumber: string,
  data: EnquiryFormData,
  companyName: string
): string {
  const cleanNumber = whatsappNumber.replace(/\D/g, "");
  const message = formatEnquiryMessage(data, companyName);
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * Builds a mailto link with pre-filled subject and body.
 */
export function buildMailtoUrl(
  recipientEmail: string,
  data: EnquiryFormData,
  companyName: string
): string {
  const subject = `Construction Enquiry from ${data.name} - ${data.projectType}`;
  const body = formatEnquiryMessage(data, companyName);
  return `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

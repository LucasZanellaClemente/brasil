export const WHATSAPP_NUMBER = "5511989422080";

const sanitizeWhatsAppNumber = (phoneNumber: string) => phoneNumber.replace(/\D/g, "");

const buildProductInquiryMessage = (colorLabel: string, size: string) =>
  `Olá! Tenho interesse na Camisa Brasil 2026 modelo ${colorLabel} tamanho ${size}. Pode me passar mais informações?`;

export const createWhatsAppHref = (phoneNumber: string, message: string) => {
  const sanitizedNumber = sanitizeWhatsAppNumber(phoneNumber);

  return `https://wa.me/${sanitizedNumber}?text=${encodeURIComponent(message)}`;
};

export const createProductWhatsAppHref = (colorLabel: string, size: string) =>
  createWhatsAppHref(WHATSAPP_NUMBER, buildProductInquiryMessage(colorLabel, size));
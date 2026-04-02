// ⚠️ Substitua pelo seu número com DDI+DDD, apenas números, sem símbolos
export const WHATSAPP_NUMBER = "5511989422080";

const sanitizeWhatsAppNumber = (phoneNumber: string) =>
  phoneNumber.replace(/\D/g, "");

const buildProductInquiryMessage = (colorLabel: string, size: string) =>
  `Olá! Vi a vitrine e tenho interesse na Camisa Brasil 2026 modelo ${colorLabel}, tamanho ${size}. Ainda está disponível? 🇧🇷`;

export const createWhatsAppHref = (phoneNumber: string, message: string): string => {
  const sanitizedNumber = sanitizeWhatsAppNumber(phoneNumber);
  return `https://wa.me/${sanitizedNumber}?text=${encodeURIComponent(message)}`;
};

export const createProductWhatsAppHref = (colorLabel: string, size: string): string => {
  const message = buildProductInquiryMessage(colorLabel, size);
  return createWhatsAppHref(WHATSAPP_NUMBER, message);
};
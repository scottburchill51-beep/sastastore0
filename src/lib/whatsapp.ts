import { siteConfig } from "@/config/site";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-PK").format(price);
}

export function createWhatsAppUrl(message: string) {
  return `https://wa.me/${siteConfig.whatsapp.number}?text=${encodeURIComponent(
    message,
  )}`;
}

export function createProductOrderMessage({
  productName,
  planName,
  price,
}: {
  productName: string;
  planName: string;
  price: number;
}) {
  return [
    `Hello, I want to order ${productName} - ${planName} from SastaStore.`,
    "",
    `Price: Rs. ${formatPrice(price)}`,
    "",
    "Please confirm availability and order details.",
  ].join("\n");
}
"use client";

import { track } from "@vercel/analytics";

import { createWhatsAppUrl } from "@/lib/whatsapp";

export function FloatingWhatsApp() {
  const whatsappUrl = createWhatsAppUrl(
    "Hello, I want to know more about SastaStore products and services.",
  );

  function handleWhatsAppClick() {
    track("WhatsApp Click", {
      source: "floating_button",
    });
  }

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with SastaStore on WhatsApp"
      onClick={handleWhatsAppClick}
      className="group fixed bottom-5 right-5 z-[100] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_35px_rgba(0,0,0,0.45)] transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-[#20bd5a] sm:bottom-6 sm:right-6 sm:h-16 sm:w-16"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-25 group-hover:animate-ping" />

      <svg
        viewBox="0 0 32 32"
        aria-hidden="true"
        className="relative h-7 w-7 fill-current sm:h-8 sm:w-8"
      >
        <path d="M16.02 3C8.84 3 3 8.74 3 15.8c0 2.48.72 4.9 2.08 6.97L3 29l6.47-2.02a13.2 13.2 0 0 0 6.54 1.74h.01C23.2 28.72 29 22.98 29 15.9 29 8.84 23.2 3 16.02 3Zm0 23.55a10.9 10.9 0 0 1-5.57-1.52l-.4-.24-3.83 1.2 1.25-3.72-.26-.42a10.6 10.6 0 0 1-1.7-5.95c0-5.88 4.72-10.66 10.53-10.66 5.81 0 10.52 4.78 10.52 10.66 0 5.88-4.72 10.65-10.54 10.65Zm5.78-7.98c-.32-.16-1.88-.92-2.17-1.03-.29-.1-.5-.16-.71.16-.21.32-.82 1.03-1 1.24-.19.21-.37.24-.69.08-.32-.16-1.34-.49-2.55-1.57-.94-.83-1.58-1.86-1.76-2.18-.19-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.19.21-.32.32-.53.1-.21.05-.4-.03-.56-.08-.16-.71-1.7-.98-2.33-.26-.62-.52-.54-.71-.55h-.61c-.21 0-.56.08-.85.4-.29.32-1.11 1.08-1.11 2.64s1.14 3.06 1.3 3.27c.16.21 2.24 3.4 5.43 4.77.76.32 1.35.52 1.81.67.76.24 1.45.21 2 .13.61-.09 1.88-.76 2.14-1.5.27-.74.27-1.37.19-1.5-.08-.13-.29-.21-.61-.37Z" />
      </svg>

      <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-lg border border-border bg-surface px-3 py-2 text-xs font-semibold text-foreground opacity-0 shadow-xl transition-all duration-300 group-hover:-translate-x-1 group-hover:opacity-100 md:block">
        Chat on WhatsApp
      </span>
    </a>
  );
}
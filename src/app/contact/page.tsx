
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import { createWhatsAppUrl } from "@/lib/whatsapp";

export const metadata = {
  title: "Contact & Support | SastaStore",
  description:
    "Contact SastaStore through WhatsApp or Telegram for digital subscriptions, payments, order tracking, delivery and digital services.",
};

const telegramUsername = "@Techboyy0";
const telegramId = "8161204113";
const telegramUrl = "https://t.me/Techboyy0";

const whatsappChannelUrl =
  "https://whatsapp.com/channel/0029Vb7BXu2B4hdMiWIlwY1v";

const facebookUrl =
  "https://www.facebook.com/share/1cbKHVxxJi/";

function ArrowIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function SupportIcon({
  type,
}: {
  type: "whatsapp" | "telegram" | "tracking";
}) {
  if (type === "telegram") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="m22 2-7 20-4-9-9-4Z" />
        <path d="M22 2 11 13" />
      </svg>
    );
  }

  if (type === "tracking") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="3" />
        <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
      </svg>
    );
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8A8.5 8.5 0 0 1 12.5 20a8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8A8.5 8.5 0 0 1 12.5 3a8.5 8.5 0 0 1 8.5 8.5Z" />
      <path d="M9 9c.5 2.5 2.5 4.5 5 5" />
    </svg>
  );
}

export default function ContactPage() {
  const generalWhatsAppUrl = createWhatsAppUrl(
    "Hello SastaStore, I need help with my order, payment or subscription.",
  );

  const productsWhatsAppUrl = createWhatsAppUrl(
    "Hello SastaStore, I need information about your digital products and subscriptions.",
  );

  const servicesWhatsAppUrl = createWhatsAppUrl(
    "Hello SastaStore, I need information about your digital services.",
  );

  return (
    <main className="min-h-screen overflow-hidden bg-gradient-to-b from-[#EFF8FF] via-white to-[#ECFDF5] text-slate-900">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-blue-100 py-16 sm:py-20">
        <div className="pointer-events-none absolute -left-24 top-5 h-64 w-64 rounded-full bg-sky-200/40 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-emerald-200/40 blur-3xl" />

        <Container>
          <div className="relative mx-auto max-w-3xl text-center">
            <span className="inline-flex rounded-full border border-blue-200 bg-white px-5 py-2 text-xs font-extrabold uppercase tracking-[0.2em] text-blue-600 shadow-sm">
              SastaStore Customer Care
            </span>

            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              How Can We
              <span className="text-blue-600">
                {" "}Help You?
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-8 text-slate-600 sm:text-base">
              Need help with an order, payment,
              subscription or digital service?
              Connect with our support team or
              track your order directly.
            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <a
                href={generalWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700"
              >
                Contact Support
                <ArrowIcon />
              </a>

              <Link
                href="/track"
                className="inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-white px-6 py-3.5 text-sm font-bold text-blue-700 transition hover:bg-blue-50"
              >
                Track My Order
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Support Channels */}
      <section className="py-14 sm:py-20">
        <Container>
          <div className="mb-9">
            <p className="text-xs font-extrabold uppercase tracking-widest text-blue-600">
              Contact Options
            </p>

            <h2 className="mt-3 text-3xl font-extrabold">
              Choose Your Support Channel
            </h2>

            <p className="mt-3 text-sm leading-7 text-slate-600">
              Select the channel that works best for you.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {/* WhatsApp Support */}
            <article className="flex h-full flex-col rounded-3xl border border-emerald-100 bg-white p-7 shadow-lg shadow-emerald-100/30 transition hover:-translate-y-1 hover:shadow-xl">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                <SupportIcon type="whatsapp" />
              </div>

              <p className="mt-6 text-xs font-extrabold uppercase tracking-wider text-emerald-600">
                Direct Customer Support
              </p>

              <h3 className="mt-2 text-2xl font-extrabold">
                WhatsApp Support
              </h3>

              <p className="mt-3 break-all text-lg font-bold text-emerald-700">
                {siteConfig.whatsapp.display}
              </p>

              <p className="mt-4 flex-1 text-sm leading-7 text-slate-600">
                Ask questions about payments,
                orders, subscriptions, product
                availability and delivery.
              </p>

              <a
                href={generalWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3.5 text-sm font-extrabold text-white transition hover:bg-emerald-700"
              >
                Open WhatsApp
                <ArrowIcon />
              </a>
            </article>

            {/* Telegram Support */}
            <article className="flex h-full flex-col rounded-3xl border border-sky-200 bg-white p-7 shadow-lg shadow-sky-100/40 transition hover:-translate-y-1 hover:shadow-xl">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
                <SupportIcon type="telegram" />
              </div>

              <p className="mt-6 text-xs font-extrabold uppercase tracking-wider text-sky-600">
                Alternative Support
              </p>

              <h3 className="mt-2 text-2xl font-extrabold">
                Telegram Support
              </h3>

              <p className="mt-3 text-lg font-extrabold text-sky-700">
                {telegramUsername}
              </p>

              <p className="mt-1 text-xs font-medium text-slate-500">
                Telegram ID: {telegramId}
              </p>

              <p className="mt-4 flex-1 text-sm leading-7 text-slate-600">
                Message our Telegram account for
                subscription questions, order
                assistance and customer support.
              </p>

              <a
                href={telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-sky-600 px-5 py-3.5 text-sm font-extrabold text-white transition hover:bg-sky-700"
              >
                Chat on Telegram
                <ArrowIcon />
              </a>

              <p className="mt-3 text-center text-xs leading-5 text-slate-500">
                Opens Telegram chat in your browser
                or Telegram app.
              </p>
            </article>

            {/* Order Tracking */}
            <article className="flex h-full flex-col rounded-3xl border border-blue-100 bg-white p-7 shadow-lg shadow-blue-100/30 transition hover:-translate-y-1 hover:shadow-xl">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                <SupportIcon type="tracking" />
              </div>

              <p className="mt-6 text-xs font-extrabold uppercase tracking-wider text-blue-600">
                Self-Service
              </p>

              <h3 className="mt-2 text-2xl font-extrabold">
                Order Tracking
              </h3>

              <p className="mt-3 text-lg font-bold text-blue-700">
                Track Your Purchase
              </p>

              <p className="mt-4 flex-1 text-sm leading-7 text-slate-600">
                Check payment verification,
                order delivery and subscription
                activation or expiry using
                your Tracking ID.
              </p>

              <Link
                href="/track"
                className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-extrabold text-white transition hover:bg-blue-700"
              >
                Track Order
                <ArrowIcon />
              </Link>
            </article>
          </div>
        </Container>
      </section>

      {/* Specific Help */}
      <section className="border-y border-blue-100 bg-white/70 py-14 sm:py-20">
        <Container>
          <div className="mb-9 text-center">
            <p className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">
              How Can We Help?
            </p>

            <h2 className="mt-3 text-3xl font-extrabold">
              Support for Every Need
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <article className="rounded-3xl border border-blue-100 bg-white p-7 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-sm font-black text-blue-700">
                PR
              </div>

              <h3 className="mt-5 text-xl font-extrabold">
                Products & Subscriptions
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                Questions about AI tools,
                premium apps, entertainment,
                productivity software, VPNs
                or subscription plans?
              </p>

              <a
                href={productsWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-blue-600 hover:text-blue-800"
              >
                Ask About a Product
                <ArrowIcon />
              </a>
            </article>

            <article className="rounded-3xl border border-emerald-100 bg-white p-7 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-sm font-black text-emerald-700">
                DS
              </div>

              <h3 className="mt-5 text-xl font-extrabold">
                Digital Services
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                Need video editing, graphic
                design, Shopify store design,
                website development or other
                digital services?
              </p>

              <a
                href={servicesWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-emerald-700 hover:text-emerald-900"
              >
                Discuss Your Project
                <ArrowIcon />
              </a>
            </article>
          </div>
        </Container>
      </section>

      {/* Social Channels */}
      <section className="py-14 sm:py-20">
        <Container>
          <div className="rounded-3xl border border-blue-100 bg-white p-7 shadow-lg shadow-blue-100/40 sm:p-10">
            <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-center">
              <div className="max-w-xl">
                <p className="text-xs font-extrabold uppercase tracking-widest text-blue-600">
                  Stay Connected
                </p>

                <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl">
                  Follow SastaStore Updates
                </h2>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Discover new products, offers,
                  digital tools, service updates
                  and announcements.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href={whatsappChannelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-700"
                >
                  WhatsApp Channel
                </a>

                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-xl border border-blue-200 bg-blue-50 px-5 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-100"
                >
                  Facebook Page
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Bottom CTA */}
      <section className="pb-16">
        <Container>
          <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-sky-600 p-8 text-center text-white shadow-xl shadow-blue-200/50 sm:p-12">
            <h2 className="text-2xl font-extrabold sm:text-3xl">
              Already Placed an Order?
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-blue-50">
              Sign in to view your order history
              and track your purchase securely.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/account"
                className="rounded-xl bg-white px-6 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-50"
              >
                My Dashboard
              </Link>

              <Link
                href="/track"
                className="rounded-xl border border-white/50 bg-white/10 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/20"
              >
                Track My Order
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}

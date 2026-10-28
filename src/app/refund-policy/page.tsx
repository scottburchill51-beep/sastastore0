
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { createWhatsAppUrl } from "@/lib/whatsapp";

export const metadata = {
  title: "Refund & Replacement Policy | SastaStore",
  description:
    "Learn about SastaStore refund eligibility, replacements, digital subscriptions, incorrect deliveries, payment issues and customer support.",
};

const telegramUrl = "https://t.me/Techboyy0";

type PolicySection = {
  number: string;
  title: string;
  paragraphs: string[];
};

const policySections: PolicySection[] = [
  {
    number: "01",
    title: "Before Placing an Order",
    paragraphs: [
      "Please review the product name, selected plan, subscription duration, price, compatibility, access conditions and delivery details before completing your purchase.",
      "If you have questions about product availability, supported devices, shared or private access, warranty conditions or delivery requirements, contact SastaStore support before making payment.",
    ],
  },
  {
    number: "02",
    title: "Digital Products & Subscriptions",
    paragraphs: [
      "SastaStore provides digital products and services, including subscriptions, digital account access, activation keys, invitations and other online products.",
      "Once a digital product has been successfully delivered or activated, it may not be eligible for a refund simply because the customer changes their mind. Eligibility depends on the applicable product terms and circumstances of the order.",
    ],
  },
  {
    number: "03",
    title: "Payment Submission & Verification",
    paragraphs: [
      "Customers can submit payment evidence through the SastaStore checkout using the available SadaPay or UBL Bank Transfer options. The transaction reference and payment screenshot are used for payment review.",
      "Uploading a payment screenshot does not automatically confirm receipt of funds, approve the payment or activate a subscription. Payment evidence is reviewed by the SastaStore team before an order proceeds.",
      "If your payment is under review or there is a verification problem, check your order status and contact support with your tracking ID and relevant transaction details.",
    ],
  },
  {
    number: "04",
    title: "Incorrect or Non-Working Delivery",
    paragraphs: [
      "If the digital product delivered to you is incorrect or does not work as described at the time of delivery, contact SastaStore as soon as possible.",
      "Provide your tracking ID, product name, selected plan and a clear description of the problem. Relevant screenshots may help explain the issue.",
      "SastaStore will review the circumstances and, where applicable, provide technical support, replacement or another appropriate resolution in accordance with the applicable terms.",
    ],
  },
  {
    number: "05",
    title: "Warranty & Replacement Conditions",
    paragraphs: [
      "Some digital products or subscription plans may include specific warranty or replacement terms, while others may not.",
      "If a warranty or replacement arrangement is clearly stated on the product page or confirmed before purchase, requests will be handled according to those terms.",
      "A replacement is not automatically guaranteed for every product or every issue.",
    ],
  },
  {
    number: "06",
    title: "Third-Party Platform Changes",
    paragraphs: [
      "Some digital products rely on external platforms, service providers or software systems that SastaStore does not directly control.",
      "Changes to a third-party provider's policies, access restrictions, account suspensions, product features, pricing or service availability after delivery do not automatically guarantee a refund.",
      "Each request will be reviewed in light of the applicable product terms and the circumstances involved.",
    ],
  },
  {
    number: "07",
    title: "Customer-Related Issues",
    paragraphs: [
      "Refunds or replacements may not be available when a problem results from incorrect customer information, misuse of a product, an unsupported device, failure to follow provided instructions, unauthorized account changes or circumstances outside SastaStore's reasonable control.",
      "Customers should review product requirements and follow relevant usage instructions. If an issue occurs, contact support with accurate details so it can be assessed.",
    ],
  },
  {
    number: "08",
    title: "Duplicate or Incorrect Payments",
    paragraphs: [
      "If you believe you have transferred money more than once or paid an incorrect amount, contact SastaStore promptly with your order tracking ID and payment transaction details.",
      "The team will review the available information to determine the payment status and any appropriate next steps.",
      "A failed checkout response or screenshot upload does not necessarily mean that an order or transfer failed. Check My Account before retrying checkout, and do not transfer money a second time solely because your screenshot upload failed.",
    ],
  },
  {
    number: "09",
    title: "Delivery & Subscription Activation",
    paragraphs: [
      "Digital product delivery and subscription activation may require manual processing after payment approval.",
      "You can view available payment and delivery statuses through My Account or the Track Order page. A submitted payment does not mean a product has already been delivered or activated.",
      "If your order remains pending or you believe the delivery information is incorrect, contact support with your tracking ID for assistance.",
    ],
  },
  {
    number: "10",
    title: "Refund & Replacement Decisions",
    paragraphs: [
      "Refund and replacement requests are considered individually based on the product purchased, applicable terms, payment information, order status, delivery or activation status, warranty conditions and the specific issue reported.",
      "Submitting a refund request does not automatically mean it has been approved. SastaStore will review the available information before communicating a decision or proposed resolution.",
    ],
  },
  {
    number: "11",
    title: "How to Request Assistance",
    paragraphs: [
      "To raise a refund, replacement, payment or delivery issue, contact SastaStore through the Contact & Support page using WhatsApp or Telegram.",
      "Please include your tracking ID, product and plan name, a description of the issue and any relevant non-sensitive supporting evidence.",
      "Never share passwords, one-time authentication codes or sensitive banking credentials when requesting assistance.",
    ],
  },
];

export default function RefundPolicyPage() {
  const whatsappSupportUrl = createWhatsAppUrl(
    "Hello SastaStore, I need assistance with a refund, replacement or payment issue. I can provide my order tracking ID.",
  );

  return (
    <main className="min-h-screen overflow-hidden bg-gradient-to-b from-[#EFF8FF] via-white to-[#ECFDF5] text-slate-900">
      {/* Page Introduction */}
      <section className="relative overflow-hidden border-b border-blue-100 py-16 sm:py-20">
        <div className="pointer-events-none absolute -left-24 top-0 h-64 w-64 rounded-full bg-sky-200/40 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-emerald-200/40 blur-3xl" />

        <Container>
          <div className="relative mx-auto max-w-3xl text-center">
            <span className="inline-flex rounded-full border border-blue-200 bg-white px-5 py-2 text-xs font-extrabold uppercase tracking-widest text-blue-600">
              Customer Policies
            </span>

            <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl">
              Refund &{" "}
              <span className="text-blue-600">
                Replacement Policy
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-8 text-slate-600 sm:text-base">
              Understand how SastaStore handles refund
              requests, digital product issues,
              replacements and payment-related
              concerns.
            </p>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-500">
              Refund eligibility depends on the
              product, applicable conditions and
              individual order circumstances.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/track"
                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
              >
                Track Your Order
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl border border-blue-200 bg-white px-6 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-50"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Important Information */}
      <section className="py-12">
        <Container>
          <div className="mx-auto max-w-5xl">
            <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-2xl font-extrabold text-amber-700">
                  !
                </div>

                <div>
                  <h2 className="text-lg font-extrabold text-amber-900">
                    Important Information
                  </h2>

                  <p className="mt-3 text-sm leading-7 text-amber-900">
                    Digital products may become
                    non-refundable after successful
                    delivery or activation, depending
                    on the applicable terms and
                    circumstances. Please review
                    your selected product and plan
                    before making payment.
                  </p>

                  <p className="mt-3 text-sm leading-7 text-amber-800">
                    A submitted payment screenshot
                    is not confirmation that your
                    payment has been approved.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Policy Contents */}
      <section className="pb-16 sm:pb-20">
        <Container>
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[270px_minmax(0,1fr)]">
            {/* Contents Sidebar */}
            <aside className="self-start lg:sticky lg:top-28">
              <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm">
                <h2 className="text-sm font-extrabold uppercase tracking-widest text-blue-600">
                  Policy Contents
                </h2>

                <nav
                  aria-label="Refund policy sections"
                  className="mt-5 flex flex-col gap-1"
                >
                  {policySections.map((section) => (
                    <a
                      key={section.number}
                      href={`#policy-${section.number}`}
                      className="rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-blue-50 hover:text-blue-700"
                    >
                      <span className="mr-2 font-bold text-blue-500">
                        {section.number}
                      </span>
                      {section.title}
                    </a>
                  ))}
                </nav>

                <Link
                  href="/faq"
                  className="mt-5 inline-flex text-sm font-bold text-blue-600 hover:underline"
                >
                  Visit Help Center →
                </Link>
              </div>
            </aside>

            {/* Policy Sections */}
            <div className="space-y-5">
              {policySections.map((section) => (
                <section
                  key={section.number}
                  id={`policy-${section.number}`}
                  className="scroll-mt-28 rounded-3xl border border-blue-100 bg-white p-6 shadow-sm sm:p-8"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-sm font-extrabold text-blue-700">
                      {section.number}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h2 className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
                        {section.title}
                      </h2>

                      <div className="mt-4 space-y-4">
                        {section.paragraphs.map(
                          (paragraph, index) => (
                            <p
                              key={index}
                              className="text-sm leading-8 text-slate-600"
                            >
                              {paragraph}
                            </p>
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                </section>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* How to Get Help */}
      <section className="border-y border-blue-100 bg-white/70 py-14 sm:py-16">
        <Container>
          <div className="mx-auto max-w-5xl">
            <div className="mb-8 text-center">
              <p className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">
                Customer Assistance
              </p>

              <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl">
                Need Help With an Order?
              </h2>

              <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-600">
                Use your tracking ID to identify
                the order and explain your issue
                to our support team.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-lg font-extrabold text-blue-700">
                  1
                </div>

                <h3 className="mt-5 text-lg font-extrabold">
                  Find Your Order
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Sign in and open My Account
                  to find your order and
                  tracking ID.
                </p>

                <Link
                  href="/account"
                  className="mt-5 inline-flex text-sm font-bold text-blue-600 hover:underline"
                >
                  My Account →
                </Link>
              </div>

              <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-100 text-lg font-extrabold text-sky-700">
                  2
                </div>

                <h3 className="mt-5 text-lg font-extrabold">
                  Check Order Status
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Review payment verification,
                  delivery and subscription
                  status before raising an issue.
                </p>

                <Link
                  href="/track"
                  className="mt-5 inline-flex text-sm font-bold text-blue-600 hover:underline"
                >
                  Track Order →
                </Link>
              </div>

              <div className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-lg font-extrabold text-emerald-700">
                  3
                </div>

                <h3 className="mt-5 text-lg font-extrabold">
                  Contact Support
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Share your tracking ID,
                  product name and a clear
                  explanation of the problem.
                </p>

                <Link
                  href="/contact"
                  className="mt-5 inline-flex text-sm font-bold text-emerald-700 hover:underline"
                >
                  Support Options →
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Final Support CTA */}
      <section className="py-16">
        <Container>
          <div className="mx-auto max-w-5xl rounded-3xl bg-gradient-to-r from-blue-600 to-sky-600 p-8 text-white shadow-xl shadow-blue-200/50 sm:p-10">
            <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-center">
              <div className="max-w-xl">
                <p className="text-xs font-extrabold uppercase tracking-widest text-blue-100">
                  Refund & Replacement Assistance
                </p>

                <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl">
                  Have a Payment or Delivery Issue?
                </h2>

                <p className="mt-3 text-sm leading-7 text-blue-50">
                  Contact SastaStore with your
                  tracking ID and relevant
                  order details so your
                  request can be reviewed.
                </p>
              </div>

              <div className="flex w-full flex-col gap-3 sm:w-auto">
                <a
                  href={whatsappSupportUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3.5 text-sm font-extrabold text-blue-700 transition hover:bg-blue-50"
                >
                  Contact on WhatsApp
                </a>

                <a
                  href={telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-xl border border-white/50 bg-white/10 px-6 py-3.5 text-sm font-extrabold text-white transition hover:bg-white/20"
                >
                  Telegram @Techboyy0
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}

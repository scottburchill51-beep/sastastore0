
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { createWhatsAppUrl } from "@/lib/whatsapp";

export const metadata = {
  title: "Terms & Conditions | SastaStore",
  description:
    "Read the terms and conditions for SastaStore digital products, subscriptions, website orders, payments, delivery, refunds and support.",
};

const telegramUrl = "https://t.me/Techboyy0";

type TermsSection = {
  title: string;
  paragraphs: string[];
};

const sections: TermsSection[] = [
  {
    title: "Acceptance of Terms",
    paragraphs: [
      "By accessing SastaStore or placing an order, you agree to the terms and conditions described on this page, subject to applicable law.",
      "Please read the relevant product details, plan conditions, refund policy and privacy policy before purchasing.",
    ],
  },
  {
    title: "Product Information & Availability",
    paragraphs: [
      "SastaStore aims to provide accurate product names, descriptions, prices, subscription durations and plan details.",
      "Digital product availability, access conditions and provider requirements may change. Customers should review the selected product and plan before payment and contact support if clarification is needed.",
    ],
  },
  {
    title: "Customer Accounts",
    paragraphs: [
      "Customers are required to sign in or create an account to complete website checkout and access customer-specific order information.",
      "Customers are responsible for providing accurate account and contact information, maintaining the security of their credentials and notifying support if they suspect unauthorised account access.",
    ],
  },
  {
    title: "Placing an Order",
    paragraphs: [
      "To place an order, select a product and plan, proceed to checkout and provide the required customer and payment information.",
      "The website may generate an order record and tracking ID during checkout. Creation of an order record does not by itself mean that payment has been approved or that the product has been delivered.",
      "Order fulfilment remains subject to successful payment verification, the applicable product conditions and availability.",
    ],
  },
  {
    title: "Pricing & Payment Methods",
    paragraphs: [
      "Prices are displayed in Pakistani Rupees (PKR), unless otherwise stated. Product prices and availability may be updated from time to time.",
      "SastaStore currently provides SadaPay and UBL Bank Transfer payment instructions during checkout. Customers should follow the payment details displayed on the website and transfer the applicable order amount.",
      "Customers are responsible for checking the recipient information and transaction amount before authorising a transfer.",
    ],
  },
  {
    title: "Payment Evidence & Verification",
    paragraphs: [
      "After transferring payment, customers must provide the required transaction reference and payment screenshot through checkout.",
      "Payment screenshots are submitted for manual review. Uploading payment evidence does not automatically approve the payment, guarantee delivery or activate a subscription.",
      "SastaStore may review the transaction information and supporting evidence before approving or rejecting a payment submission.",
    ],
  },
  {
    title: "Duplicate or Incorrect Payments",
    paragraphs: [
      "If checkout is interrupted or payment screenshot submission fails, customers should check their account order history before attempting checkout again.",
      "Customers should not transfer payment a second time solely because a website request or screenshot upload failed.",
      "If a duplicate transfer or incorrect payment amount occurs, customers should contact support with their tracking ID and relevant transaction information so the matter can be reviewed.",
    ],
  },
  {
    title: "Digital Delivery",
    paragraphs: [
      "Digital products may be delivered through account access, subscription activation, invitations, activation keys or another method appropriate to the selected product.",
      "Delivery and activation may require manual processing after payment approval. Delivery timing varies depending on the product, provider requirements and necessary setup.",
      "A submitted or approved payment should not be treated as confirmation that digital access has already been delivered.",
    ],
  },
  {
    title: "Subscription Activation & Expiry",
    paragraphs: [
      "Where applicable, subscription activation and expiry dates may be recorded against the customer's order.",
      "Customers can check available subscription information in My Account and through the order tracking page.",
      "Subscription access, duration, renewal options and expiry conditions depend on the selected product and plan. Renewal is not automatic unless expressly stated for the relevant service.",
    ],
  },
  {
    title: "Order Tracking",
    paragraphs: [
      "Each successfully created order may have a unique tracking ID that customers can use to check payment and delivery status.",
      "Customers must be authenticated to view their order details. Order information is intended to be accessible only to the account associated with the purchase.",
      "Tracking information reflects the order records available in the SastaStore system and may change as an order is reviewed, processed or delivered.",
    ],
  },
  {
    title: "Customer Responsibilities",
    paragraphs: [
      "Customers must provide accurate information required for payment review, product delivery and customer support.",
      "Customers are responsible for following applicable product instructions, respecting third-party platform rules and using purchased products only for lawful purposes.",
      "Customers should not share account passwords, one-time codes or sensitive financial credentials with support representatives.",
    ],
  },
  {
    title: "Third-Party Products & Trademarks",
    paragraphs: [
      "Some SastaStore products relate to third-party software, platforms and digital services.",
      "The relevant brand names, trademarks and intellectual property belong to their respective owners. SastaStore is not automatically affiliated with, endorsed by or sponsored by those organisations unless expressly stated.",
      "Customers may also be subject to the terms and policies of the relevant third-party service provider.",
    ],
  },
  {
    title: "Third-Party Service Changes",
    paragraphs: [
      "Third-party providers may modify their pricing, features, account requirements, access rules, subscription conditions or other service terms.",
      "SastaStore cannot directly control changes introduced by those providers. Issues involving third-party services will be assessed according to the applicable product terms and circumstances.",
    ],
  },
  {
    title: "Warranty & Replacement",
    paragraphs: [
      "Warranty, technical support and replacement eligibility are product-specific.",
      "Where a warranty or replacement period is stated for a product or agreed before purchase, those conditions will apply to the relevant order.",
      "Products without explicitly stated warranty coverage should not be assumed to include a warranty or guaranteed replacement.",
    ],
  },
  {
    title: "Refunds & Cancellations",
    paragraphs: [
      "Refund and replacement eligibility depends on the selected product, applicable terms, payment status, delivery or activation status and individual circumstances.",
      "Digital products that have been successfully delivered or activated may not be eligible for a refund merely because the customer changes their mind.",
      "Customers should review the separate Refund & Replacement Policy and contact support when they need assistance with a specific order.",
    ],
  },
  {
    title: "Custom Digital Services",
    paragraphs: [
      "SastaStore may provide custom digital services such as graphic design, video editing, website development, Shopify-related work and other agreed services.",
      "Project scope, pricing, timelines, deliverables and revision arrangements should be discussed and confirmed for the particular service before work proceeds.",
    ],
  },
  {
    title: "Limitation of Responsibility",
    paragraphs: [
      "SastaStore will make reasonable efforts to provide the purchased product or agreed service and to address reported customer issues.",
      "Interruptions, restrictions or changes caused by third-party platforms, internet connectivity, customer devices or events outside SastaStore's reasonable control may affect service availability.",
      "Nothing in these terms is intended to exclude or limit rights or responsibilities that cannot lawfully be excluded or limited.",
    ],
  },
  {
    title: "Privacy & Customer Information",
    paragraphs: [
      "Customer information may be processed for authentication, checkout, payment verification, order management, delivery, subscription tracking and customer support.",
      "For further information about how personal information is handled, please review the SastaStore Privacy Policy.",
    ],
  },
  {
    title: "Changes to These Terms",
    paragraphs: [
      "SastaStore may update these terms to reflect changes in products, services, website functionality, payment methods or applicable requirements.",
      "The latest published version will be displayed on this page. Changes will be applied subject to applicable law and any existing contractual commitments.",
    ],
  },
  {
    title: "Contact & Customer Support",
    paragraphs: [
      "If you have questions about these terms, a product, an order or a subscription, contact SastaStore through the official Contact & Support page.",
      "For questions about an existing order, include your tracking ID so the support team can identify the relevant purchase.",
    ],
  },
];

export default function TermsPage() {
  const whatsappUrl = createWhatsAppUrl(
    "Hello SastaStore, I have a question about your Terms & Conditions or a product order.",
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#EFF8FF] via-white to-[#ECFDF5] text-slate-900">
      {/* Hero */}
      <section className="border-b border-blue-100 py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex rounded-full border border-blue-200 bg-white px-5 py-2 text-xs font-extrabold uppercase tracking-widest text-blue-600">
              Website & Purchase Terms
            </span>

            <h1 className="mt-7 text-4xl font-extrabold tracking-tight sm:text-5xl">
              Terms &{" "}
              <span className="text-blue-600">
                Conditions
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-8 text-slate-600 sm:text-base">
              Important information about SastaStore
              orders, digital products, subscriptions,
              payments, delivery and customer
              responsibilities.
            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link
                href="/refund-policy"
                className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
              >
                Refund Policy
              </Link>

              <Link
                href="/privacy"
                className="rounded-xl border border-blue-200 bg-white px-6 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-50"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Important Notice */}
      <section className="pt-12">
        <Container>
          <div className="mx-auto max-w-5xl rounded-2xl border border-blue-200 bg-blue-50 p-6">
            <h2 className="text-lg font-extrabold text-blue-900">
              Before You Place an Order
            </h2>

            <p className="mt-3 text-sm leading-7 text-blue-800">
              Please review the selected product,
              plan, price, duration, compatibility
              and access conditions before making
              payment. Payment submissions require
              verification and digital delivery
              may require manual activation.
            </p>
          </div>
        </Container>
      </section>

      {/* Terms Content */}
      <section className="py-12 sm:py-16">
        <Container>
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[270px_minmax(0,1fr)]">
            {/* Contents */}
            <aside className="self-start lg:sticky lg:top-28">
              <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm">
                <h2 className="text-sm font-extrabold uppercase tracking-widest text-blue-600">
                  On This Page
                </h2>

                <nav
                  aria-label="Terms and conditions sections"
                  className="mt-5 flex flex-col gap-1"
                >
                  {sections.map((section, index) => (
                    <a
                      key={section.title}
                      href={`#terms-${index + 1}`}
                      className="rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-blue-50 hover:text-blue-700"
                    >
                      <span className="mr-2 font-bold text-blue-500">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      {section.title}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Individual Sections */}
            <div className="space-y-5">
              {sections.map((section, index) => (
                <section
                  key={section.title}
                  id={`terms-${index + 1}`}
                  className="scroll-mt-28 rounded-3xl border border-blue-100 bg-white p-6 shadow-sm sm:p-8"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-sm font-extrabold text-blue-700">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h2 className="text-xl font-extrabold text-slate-900 sm:text-2xl">
                        {section.title}
                      </h2>

                      <div className="mt-4 space-y-4">
                        {section.paragraphs.map(
                          (paragraph, paragraphIndex) => (
                            <p
                              key={paragraphIndex}
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

      {/* Related Policies */}
      <section className="border-y border-blue-100 bg-white/70 py-14">
        <Container>
          <div className="mx-auto max-w-5xl">
            <h2 className="text-center text-2xl font-extrabold sm:text-3xl">
              Related Information
            </h2>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <Link
                href="/privacy"
                className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm transition hover:border-blue-300"
              >
                <h3 className="font-extrabold">
                  Privacy Policy
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-500">
                  How customer information is handled.
                </p>

                <p className="mt-5 text-sm font-bold text-blue-600">
                  Read Policy →
                </p>
              </Link>

              <Link
                href="/refund-policy"
                className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm transition hover:border-blue-300"
              >
                <h3 className="font-extrabold">
                  Refund Policy
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-500">
                  Refunds, replacements and eligibility.
                </p>

                <p className="mt-5 text-sm font-bold text-blue-600">
                  Read Policy →
                </p>
              </Link>

              <Link
                href="/faq"
                className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm transition hover:border-blue-300"
              >
                <h3 className="font-extrabold">
                  Help & FAQ
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-500">
                  Quick answers to common questions.
                </p>

                <p className="mt-5 text-sm font-bold text-blue-600">
                  View FAQ →
                </p>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Support */}
      <section className="py-16">
        <Container>
          <div className="mx-auto max-w-5xl rounded-3xl bg-gradient-to-r from-blue-600 to-sky-600 p-8 text-white sm:p-10">
            <h2 className="text-2xl font-extrabold sm:text-3xl">
              Have Questions About These Terms?
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-blue-50">
              Contact SastaStore before placing
              an order or whenever you need help
              understanding a product or policy.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-white px-6 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-50"
              >
                WhatsApp Support
              </a>

              <a
                href={telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-white/50 bg-white/10 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/20"
              >
                Telegram @Techboyy0
              </a>

              <Link
                href="/contact"
                className="rounded-xl border border-white/50 bg-white/10 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/20"
              >
                Contact Page
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}

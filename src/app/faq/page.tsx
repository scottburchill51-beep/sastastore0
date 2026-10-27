
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { createWhatsAppUrl } from "@/lib/whatsapp";

export const metadata = {
  title: "FAQ & Help Center | SastaStore",
  description:
    "Find answers about SastaStore orders, SadaPay and UBL bank payments, payment verification, order tracking, subscription delivery, refunds and customer support.",
};

type FAQItem = {
  question: string;
  answer: string;
};

type FAQCategory = {
  id: string;
  title: string;
  description: string;
  items: FAQItem[];
};

const faqCategories: FAQCategory[] = [
  {
    id: "orders",
    title: "Ordering & Checkout",
    description:
      "How to place an order and manage your purchases.",
    items: [
      {
        question: "How do I place an order?",
        answer:
          "Browse our products, select a plan and click Buy Now. Sign in or create an account, complete your checkout details, choose a payment method and submit your payment screenshot with the transaction reference.",
      },
      {
        question: "Do I need an account to order?",
        answer:
          "Yes. You need to sign in to place an order. Your account also allows you to view your order history, check payment status and track subscription delivery.",
      },
      {
        question: "Where can I see my previous orders?",
        answer:
          "Sign in and open My Account. The My Orders & Tracking section displays the orders associated with your account, including their tracking IDs and available status information.",
      },
      {
        question: "Can I order more than one product?",
        answer:
          "Yes. You can place separate orders for different products or plans. Each successfully created order receives its own tracking ID.",
      },
      {
        question: "Can I request a product that is not listed?",
        answer:
          "Yes. Contact our support team on WhatsApp or Telegram with the product name and required plan. We can discuss whether an option is available.",
      },
    ],
  },
  {
    id: "payments",
    title: "Payments & Verification",
    description:
      "Supported payment methods and screenshot verification.",
    items: [
      {
        question: "Which payment methods are accepted?",
        answer:
          "SastaStore currently provides SadaPay and UBL Bank Transfer as checkout payment methods. Select your preferred method during checkout and follow the payment instructions shown there.",
      },
      {
        question: "Where can I find the payment details?",
        answer:
          "The checkout page displays the relevant SadaPay or UBL Bank Transfer account details and your order amount after you select a payment method. Always confirm the details shown at checkout before transferring money.",
      },
      {
        question: "How do I submit payment confirmation?",
        answer:
          "After transferring the payment, enter the transaction reference and upload a payment screenshot in checkout. The accepted formats are JPG, PNG and WEBP, with a maximum file size of 5 MB.",
      },
      {
        question: "Does uploading a screenshot automatically approve my payment?",
        answer:
          "No. Uploading a screenshot submits your payment evidence for review. SastaStore's team must review and approve the payment before the order can proceed to delivery and subscription activation.",
      },
      {
        question: "What does Payment Under Review mean?",
        answer:
          "It means your payment evidence has been submitted and is awaiting review by the SastaStore team. The status does not mean your payment has already been approved.",
      },
      {
        question: "What if my payment screenshot upload fails?",
        answer:
          "First open My Account and check whether the order or payment submission appears there. If your order was created but the screenshot was not submitted, follow the available retry instructions or contact support with your tracking ID. Do not transfer the payment a second time just because an upload failed.",
      },
      {
        question: "What if I accidentally send the wrong amount?",
        answer:
          "Contact SastaStore support with your tracking ID, the amount transferred and the payment transaction reference. The team will review the issue. Do not make another transfer until you understand the status of the first payment.",
      },
    ],
  },
  {
    id: "tracking",
    title: "Order Tracking & Delivery",
    description:
      "Track payment verification, delivery and order progress.",
    items: [
      {
        question: "How do I track my order?",
        answer:
          "Open the Track Order page and enter your tracking ID while signed in. You can also use the Track This Order button next to an order in your Customer Dashboard.",
      },
      {
        question: "Where do I get my tracking ID?",
        answer:
          "Your tracking ID is provided when an order is successfully created. After payment evidence is submitted, it is also shown on the confirmation screen. You can find it again in My Account.",
      },
      {
        question: "Can another customer view my order?",
        answer:
          "Order tracking requires sign-in and is restricted to orders belonging to the authenticated customer account. A tracking ID by itself does not provide access to another customer's order details.",
      },
      {
        question: "How long does digital product delivery take?",
        answer:
          "Delivery timing depends on the product, plan, payment verification and any required account setup. Delivery is not automatic when you submit payment, and a fixed delivery time is not guaranteed for every product.",
      },
      {
        question: "What does Awaiting Delivery mean?",
        answer:
          "It means the payment has been approved but the subscription or product is still awaiting delivery or activation by the SastaStore team.",
      },
      {
        question: "What should I do if my order is delayed?",
        answer:
          "Check the latest order status in My Account or Track Order. If you need assistance, contact customer support and include your tracking ID so the team can identify the order.",
      },
    ],
  },
  {
    id: "subscriptions",
    title: "Subscriptions & Product Access",
    description:
      "Activation dates, expiry and access-related questions.",
    items: [
      {
        question: "When does my subscription become active?",
        answer:
          "A subscription is considered active in your Customer Dashboard after its payment is approved, the order is marked delivered and valid activation and expiry dates have been recorded.",
      },
      {
        question: "Where can I check my subscription expiry date?",
        answer:
          "Open My Account and check My Active Subscriptions. For subscriptions with recorded activation information, the dashboard shows activation date, expiry date and remaining days.",
      },
      {
        question: "What happens when my subscription expires?",
        answer:
          "The dashboard will identify the subscription as expired after its recorded expiry date has passed. Continued access or renewal depends on the relevant product and plan.",
      },
      {
        question: "What is the difference between shared and private plans?",
        answer:
          "Private and shared plans can have different access arrangements, depending on the product. Review the selected product's plan information carefully, and contact support if you need clarification before purchase.",
      },
      {
        question: "Are all products always available?",
        answer:
          "Not necessarily. Availability can depend on the product, plan or provider. If you are unsure about stock or access terms, contact support before making payment.",
      },
      {
        question: "Does every product include a warranty or replacement?",
        answer:
          "No universal warranty or replacement guarantee applies to every product. Any applicable coverage depends on the selected product, plan and stated terms. Contact support for details if something is unclear.",
      },
    ],
  },
  {
    id: "refunds",
    title: "Refunds & Order Issues",
    description:
      "What to do if something goes wrong.",
    items: [
      {
        question: "Can I request a refund?",
        answer:
          "Refund eligibility depends on the circumstances of the order and SastaStore's applicable Refund Policy. Review that policy and contact support with your tracking ID if you would like your order assessed.",
      },
      {
        question: "What should I do if I receive the wrong product or plan?",
        answer:
          "Contact support with your tracking ID, the product or plan you ordered and a clear description of the problem. Our team can review the order information and discuss the available resolution.",
      },
      {
        question: "What if my subscription stops working?",
        answer:
          "Contact support with your tracking ID and explain the issue. Include relevant screenshots if necessary, but never share passwords, one-time login codes or other sensitive credentials through an unsecured message.",
      },
      {
        question: "What happens if my payment is rejected?",
        answer:
          "Check your order's latest payment status and contact support if clarification is needed. A rejected screenshot or payment review does not mean the subscription has been activated.",
      },
    ],
  },
  {
    id: "services",
    title: "Digital Services & Customer Support",
    description:
      "Custom projects and ways to get assistance.",
    items: [
      {
        question: "Does SastaStore provide digital services?",
        answer:
          "Yes. SastaStore also offers digital services such as video editing, graphic design, Shopify store design, website development and other custom digital work. Availability and project scope should be confirmed with support.",
      },
      {
        question: "How do I discuss a custom digital project?",
        answer:
          "Contact SastaStore with your project requirements, desired deliverables, relevant examples and expected deadline. The team can discuss availability, scope and pricing.",
      },
      {
        question: "Can I contact SastaStore on Telegram?",
        answer:
          "Yes. You can contact our Telegram support account at @Techboyy0. You can also use WhatsApp support from the Contact & Support page.",
      },
      {
        question: "How can I receive product and deal updates?",
        answer:
          "Follow the SastaStore WhatsApp Channel for updates about products, deals, services and announcements.",
      },
    ],
  },
];

const telegramUrl = "https://t.me/Techboyy0";

const whatsappChannelUrl =
  "https://whatsapp.com/channel/0029Vb7BXu2B4hdMiWIlwY1v";

export default function FAQPage() {
  const whatsappUrl = createWhatsAppUrl(
    "Hello SastaStore, I need help with an order, payment, subscription or digital service.",
  );

  const faqCount = faqCategories.reduce(
    (total, category) => total + category.items.length,
    0,
  );

  return (
    <main className="min-h-screen overflow-hidden bg-gradient-to-b from-[#EFF8FF] via-white to-[#ECFDF5] text-slate-900">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-blue-100 py-16 sm:py-20">
        <div className="pointer-events-none absolute -left-20 top-0 h-64 w-64 rounded-full bg-sky-200/40 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-emerald-200/40 blur-3xl" />

        <Container>
          <div className="relative mx-auto max-w-3xl text-center">
            <span className="inline-flex rounded-full border border-blue-200 bg-white px-5 py-2 text-xs font-extrabold uppercase tracking-widest text-blue-600">
              SastaStore Help Center
            </span>

            <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl">
              Frequently Asked{" "}
              <span className="text-blue-600">
                Questions
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-8 text-slate-600 sm:text-base">
              Clear answers about ordering, payments,
              digital subscriptions, delivery,
              tracking and customer support.
            </p>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/track"
                className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
              >
                Track My Order
              </Link>

              <Link
                href="/contact"
                className="rounded-xl border border-blue-200 bg-white px-6 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-50"
              >
                Contact Support
              </Link>
            </div>

            <p className="mt-5 text-xs font-semibold text-slate-500">
              {faqCount} helpful answers across{" "}
              {faqCategories.length} categories
            </p>
          </div>
        </Container>
      </section>

      {/* Category Navigation */}
      <section className="border-b border-blue-100 bg-white/80 py-7">
        <Container>
          <p className="mb-4 text-sm font-extrabold text-slate-900">
            Jump to a topic
          </p>

          <nav
            aria-label="FAQ categories"
            className="flex flex-wrap gap-2"
          >
            {faqCategories.map((category) => (
              <a
                key={category.id}
                href={`#${category.id}`}
                className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-4 py-2.5 text-xs font-bold text-blue-700 transition hover:border-blue-300 hover:bg-blue-100 sm:text-sm"
              >
                {category.title}
              </a>
            ))}
          </nav>
        </Container>
      </section>

      {/* FAQ Sections */}
      <section className="py-14 sm:py-20">
        <Container>
          <div className="mx-auto max-w-4xl space-y-12">
            {faqCategories.map((category, categoryIndex) => (
              <section
                key={category.id}
                id={category.id}
                className="scroll-mt-32"
                aria-labelledby={`${category.id}-heading`}
              >
                <div className="mb-6 flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 text-lg font-extrabold text-blue-600">
                    {String(categoryIndex + 1).padStart(
                      2,
                      "0",
                    )}
                  </div>

                  <div>
                    <h2
                      id={`${category.id}-heading`}
                      className="text-2xl font-extrabold tracking-tight sm:text-3xl"
                    >
                      {category.title}
                    </h2>

                    <p className="mt-2 text-sm leading-7 text-slate-500">
                      {category.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {category.items.map((faq) => (
                    <details
                      key={faq.question}
                      className="group overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm transition-all duration-200 open:border-blue-300 open:shadow-md"
                    >
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 marker:hidden sm:px-6 [&::-webkit-details-marker]:hidden">
                        <span className="text-sm font-bold leading-6 text-slate-900 sm:text-base">
                          {faq.question}
                        </span>

                        <span
                          aria-hidden="true"
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-blue-100 bg-blue-50 text-xl font-bold text-blue-600 transition-transform group-open:rotate-45 group-open:bg-blue-600 group-open:text-white"
                        >
                          +
                        </span>
                      </summary>

                      <div className="border-t border-blue-50 px-5 pb-6 pt-4 sm:px-6">
                        <p className="text-sm leading-8 text-slate-600">
                          {faq.answer}
                        </p>

                        {category.id === "tracking" && (
                          <Link
                            href="/track"
                            className="mt-4 inline-flex text-sm font-bold text-blue-600 hover:underline"
                          >
                            Open Order Tracking →
                          </Link>
                        )}

                        {category.id === "refunds" && (
                          <Link
                            href="/refund-policy"
                            className="mt-4 inline-flex text-sm font-bold text-blue-600 hover:underline"
                          >
                            Read Refund Policy →
                          </Link>
                        )}
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </Container>
      </section>

      {/* Quick Access */}
      <section className="border-y border-blue-100 bg-white/70 py-14">
        <Container>
          <div className="mx-auto mb-8 max-w-2xl text-center">
            <p className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">
              Quick Access
            </p>

            <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl">
              Manage Your Purchase
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Link
              href="/account"
              className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm transition hover:border-blue-300 hover:shadow-md"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-xl font-extrabold text-blue-700">
                1
              </div>

              <h3 className="mt-5 text-lg font-extrabold">
                My Account
              </h3>

              <p className="mt-2 text-sm leading-7 text-slate-500">
                Check orders, active subscriptions
                and recorded expiry dates.
              </p>

              <p className="mt-4 text-sm font-bold text-blue-600">
                Open Dashboard →
              </p>
            </Link>

            <Link
              href="/track"
              className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm transition hover:border-blue-300 hover:shadow-md"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-100 text-xl font-extrabold text-sky-700">
                2
              </div>

              <h3 className="mt-5 text-lg font-extrabold">
                Track Order
              </h3>

              <p className="mt-2 text-sm leading-7 text-slate-500">
                View payment review, delivery
                and subscription status.
              </p>

              <p className="mt-4 text-sm font-bold text-blue-600">
                Track Purchase →
              </p>
            </Link>

            <Link
              href="/refund-policy"
              className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm transition hover:border-blue-300 hover:shadow-md"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-xl font-extrabold text-emerald-700">
                3
              </div>

              <h3 className="mt-5 text-lg font-extrabold">
                Refund Policy
              </h3>

              <p className="mt-2 text-sm leading-7 text-slate-500">
                Read the applicable refund
                conditions and request guidance.
              </p>

              <p className="mt-4 text-sm font-bold text-blue-600">
                View Policy →
              </p>
            </Link>
          </div>
        </Container>
      </section>

      {/* Support CTA */}
      <section className="py-16">
        <Container>
          <div className="rounded-3xl border border-blue-100 bg-white p-7 shadow-lg shadow-blue-100/50 sm:p-10">
            <div className="flex flex-col items-start justify-between gap-7 lg:flex-row lg:items-center">
              <div className="max-w-xl">
                <p className="text-xs font-extrabold uppercase tracking-widest text-blue-600">
                  Still Need Help?
                </p>

                <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl">
                  Can&apos;t Find Your Answer?
                </h2>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Contact us with your question.
                  For an existing order, please
                  include the tracking ID so our
                  team can identify your purchase.
                </p>
              </div>

              <div className="flex w-full flex-col gap-3 sm:w-auto">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-6 py-3.5 text-sm font-extrabold text-white transition hover:bg-emerald-700"
                >
                  Chat on WhatsApp
                </a>

                <a
                  href={telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-xl bg-sky-600 px-6 py-3.5 text-sm font-extrabold text-white transition hover:bg-sky-700"
                >
                  Telegram @Techboyy0
                </a>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-xl border border-blue-200 bg-blue-50 px-6 py-3.5 text-sm font-extrabold text-blue-700 transition hover:bg-blue-100"
                >
                  All Support Options
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <a
              href={whatsappChannelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex text-sm font-bold text-blue-600 hover:underline"
            >
              Follow our WhatsApp Channel for Updates →
            </a>
          </div>
        </Container>
      </section>
    </main>
  );
}

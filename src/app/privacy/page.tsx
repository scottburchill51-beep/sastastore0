
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { createWhatsAppUrl } from "@/lib/whatsapp";

export const metadata = {
  title: "Privacy Policy | SastaStore",
  description:
    "Learn how SastaStore collects, uses and protects customer information, account details, order records and payment evidence.",
};

const telegramUrl = "https://t.me/Techboyy0";

const sections = [
  {
    title: "Information We Collect",
    content: [
      "When you create an account or place an order, SastaStore may collect information such as your email address, name, WhatsApp number, selected products, subscription plans, order history and related customer details.",
      "When you submit a payment for verification, we collect the payment method, transaction reference and payment screenshot you provide.",
    ],
  },
  {
    title: "How We Use Your Information",
    content: [
      "We use customer information to manage accounts, process orders, review payment evidence, arrange digital product delivery, activate subscriptions and provide customer support.",
      "Order and subscription information is also used to display your purchase history, payment status, delivery progress and recorded subscription expiry dates.",
    ],
  },
  {
    title: "Accounts & Authentication",
    content: [
      "SastaStore uses account authentication to provide access to customer dashboards, order tracking and other account-specific features.",
      "Customers should keep their login credentials secure and should not share passwords or one-time authentication codes with anyone.",
    ],
  },
  {
    title: "Payment Information",
    content: [
      "SastaStore currently offers SadaPay and UBL Bank Transfer as website checkout payment methods. Customers transfer payments through their chosen banking or payment service and submit transaction details for verification.",
      "The website does not currently collect payment card numbers through a card checkout form. Payment transfers themselves are handled by the payment provider or bank used by the customer.",
      "Uploading a payment screenshot does not automatically approve a payment or activate a subscription.",
    ],
  },
  {
    title: "Payment Screenshot Storage",
    content: [
      "Payment screenshots submitted through checkout are stored in a non-public storage area. Access is restricted through the website's configured authentication and authorisation controls.",
      "Authorised administrative functions may access payment evidence for order verification, payment review and customer support.",
      "Although reasonable safeguards are used, no online service can guarantee absolute security.",
    ],
  },
  {
    title: "Order Tracking & Customer Dashboard",
    content: [
      "Signed-in customers can view order information associated with their accounts, including tracking IDs, available payment and delivery statuses, and subscription activation or expiry information where recorded.",
      "Order-tracking features are designed to restrict access to the authenticated customer's own order records.",
    ],
  },
  {
    title: "Customer Communication",
    content: [
      "If you contact SastaStore through WhatsApp or Telegram, we may receive the contact details, messages and order information you voluntarily share.",
      "Communications through these platforms are also subject to the respective provider's privacy practices and terms.",
    ],
  },
  {
    title: "Service Providers & Sharing",
    content: [
      "SastaStore uses technology and service providers to operate its website, support authentication, store records and deliver services.",
      "As stated in our existing policy, SastaStore does not sell customer information. Information may be shared when reasonably necessary to provide requested services, fulfil applicable requirements or protect customers and the business.",
      "Information processed by third-party providers may also be subject to their applicable privacy terms.",
    ],
  },
  {
    title: "Cookies & Session Information",
    content: [
      "The website uses session-related mechanisms, including authentication cookies, to maintain signed-in access and support account functionality.",
      "Some browser storage may also be used to help manage checkout requests and reduce accidental duplicate order submissions.",
    ],
  },
  {
    title: "Data Retention",
    content: [
      "Customer accounts, order records and payment-related information may be retained as needed for service delivery, transaction review, support, security and applicable obligations.",
      "Retention periods may vary depending on the information and purpose involved. Contact SastaStore for questions regarding a particular record.",
    ],
  },
  {
    title: "Your Privacy Questions",
    content: [
      "If you would like to ask about personal information associated with your account, request a correction or raise a privacy concern, contact SastaStore through the official support channels.",
      "Requests involving personal account information may require verification of account ownership before action is taken. Requests will be assessed subject to operational and applicable legal requirements.",
    ],
  },
  {
    title: "Data Security",
    content: [
      "SastaStore takes reasonable measures to help protect customer information, including authenticated access and access restrictions for order records and payment evidence.",
      "No internet-based communication, website or storage system can be guaranteed to be completely secure. Customers should avoid sharing sensitive credentials through support messages.",
    ],
  },
  {
    title: "Policy Updates",
    content: [
      "This Privacy Policy may be updated when SastaStore changes its website features, service providers, payment methods, operating practices or applicable requirements.",
      "The latest published version will be available on this page.",
    ],
  },
];

export default function PrivacyPage() {
  const whatsappUrl = createWhatsAppUrl(
    "Hello SastaStore, I have a question about your Privacy Policy or my customer information.",
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#EFF8FF] via-white to-[#ECFDF5] text-slate-900">
      {/* Hero */}
      <section className="border-b border-blue-100 py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <span className="rounded-full border border-blue-200 bg-white px-5 py-2 text-xs font-extrabold uppercase tracking-widest text-blue-600">
              Customer Privacy
            </span>

            <h1 className="mt-7 text-4xl font-extrabold tracking-tight sm:text-5xl">
              Privacy{" "}
              <span className="text-blue-600">
                Policy
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-8 text-slate-600 sm:text-base">
              Learn how SastaStore handles customer
              account information, orders, payment
              evidence and support communications.
            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link
                href="/contact"
                className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white hover:bg-blue-700"
              >
                Contact Support
              </Link>

              <Link
                href="/terms"
                className="rounded-xl border border-blue-200 bg-white px-6 py-3 text-sm font-bold text-blue-700 hover:bg-blue-50"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Policy */}
      <section className="py-14 sm:py-20">
        <Container>
          <div className="mx-auto max-w-5xl">
            <div className="mb-8 rounded-2xl border border-blue-100 bg-blue-50 p-6">
              <h2 className="font-extrabold text-blue-900">
                About This Policy
              </h2>

              <p className="mt-2 text-sm leading-7 text-blue-800">
                This policy describes how customer
                information is handled when using
                SastaStore's website, account,
                checkout, order tracking and support
                features.
              </p>
            </div>

            <div className="space-y-5">
              {sections.map((section, index) => (
                <section
                  key={section.title}
                  className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm sm:p-8"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-sm font-extrabold text-blue-700">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h2 className="text-xl font-extrabold text-slate-900">
                        {section.title}
                      </h2>

                      <div className="mt-4 space-y-4">
                        {section.content.map(
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

      {/* Contact */}
      <section className="border-t border-blue-100 py-14">
        <Container>
          <div className="mx-auto max-w-5xl rounded-3xl bg-gradient-to-r from-blue-600 to-sky-600 p-8 text-white sm:p-10">
            <h2 className="text-2xl font-extrabold sm:text-3xl">
              Questions About Your Privacy?
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-blue-50">
              Contact SastaStore support if you
              have questions about account details,
              order information or this policy.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-white px-6 py-3 text-sm font-bold text-blue-700 hover:bg-blue-50"
              >
                WhatsApp Support
              </a>

              <a
                href={telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-white/50 bg-white/10 px-6 py-3 text-sm font-bold text-white hover:bg-white/20"
              >
                Telegram @Techboyy0
              </a>

              <Link
                href="/contact"
                className="rounded-xl border border-white/50 bg-white/10 px-6 py-3 text-sm font-bold text-white hover:bg-white/20"
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

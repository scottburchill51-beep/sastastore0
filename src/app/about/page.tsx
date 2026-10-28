
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { createWhatsAppUrl } from "@/lib/whatsapp";

export const metadata = {
  title: "About Us | SastaStore",
  description:
    "Discover SastaStore, our mission, digital products, subscription services, customer experience and the team behind our digital marketplace in Pakistan.",
};

const teamMembers = [
  {
    name: "Shaloom Victor",
    role: "CEO",
    initials: "SV",
    description:
      "Leading SastaStore with a vision to make useful digital tools, premium subscriptions and online services more accessible and affordable for customers in Pakistan.",
  },
  {
    name: "Scott Burchill",
    role: "Admin",
    initials: "SB",
    description:
      "Supporting day-to-day SastaStore operations, platform management and a smooth, organised experience for customers using the storefront.",
  },
];

const offerings = [
  {
    number: "01",
    title: "AI & Productivity",
    description:
      "Explore AI tools, productivity applications and digital solutions for learning, work and everyday tasks.",
  },
  {
    number: "02",
    title: "Creative Software",
    description:
      "Discover creative software and digital tools for design, editing and content production.",
  },
  {
    number: "03",
    title: "Digital Subscriptions",
    description:
      "Browse subscription plans across entertainment, learning, software and other supported digital categories.",
  },
  {
    number: "04",
    title: "Professional Services",
    description:
      "Discuss projects such as graphic design, video editing, Shopify store design and website development.",
  },
];

const values = [
  {
    title: "Accessible Pricing",
    description:
      "Our aim is to help customers discover useful digital products at competitive prices.",
  },
  {
    title: "Clear Product Information",
    description:
      "Compare available products, plan details and prices before placing an order.",
  },
  {
    title: "Order Visibility",
    description:
      "Use your account dashboard and tracking ID to follow payment reviews and delivery progress.",
  },
  {
    title: "Customer Assistance",
    description:
      "Contact our team through WhatsApp or Telegram whenever you need help understanding a product or resolving an order issue.",
  },
];

const steps = [
  {
    number: "01",
    title: "Explore Products",
    description:
      "Browse the catalog and choose the digital product and plan that match your needs.",
  },
  {
    number: "02",
    title: "Complete Checkout",
    description:
      "Sign in, provide your details and follow the SadaPay or UBL Bank Transfer instructions.",
  },
  {
    number: "03",
    title: "Submit Payment Proof",
    description:
      "Upload your transaction reference and payment screenshot for manual verification.",
  },
  {
    number: "04",
    title: "Track Your Order",
    description:
      "Check your order status while our team reviews payment and arranges delivery or activation.",
  },
];

const telegramUrl = "https://t.me/Techboyy0";

function ArrowIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="17"
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

export default function AboutPage() {
  const whatsappUrl = createWhatsAppUrl(
    "Hello SastaStore, I would like to know more about your products, subscriptions or digital services.",
  );

  return (
    <main className="min-h-screen overflow-hidden bg-gradient-to-b from-[#EFF8FF] via-white to-[#ECFDF5] text-slate-900">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-blue-100 py-16 sm:py-24">
        <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-sky-200/40 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-emerald-200/40 blur-3xl" />

        <Container>
          <div className="relative mx-auto max-w-4xl text-center">
            <span className="inline-flex rounded-full border border-blue-200 bg-white px-5 py-2 text-xs font-extrabold uppercase tracking-widest text-blue-600 shadow-sm">
              Get to Know SastaStore
            </span>

            <h1 className="mt-7 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Premium Digital Tools.
              <span className="block text-blue-600">
                More Accessible Prices.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-sm leading-8 text-slate-600 sm:text-base">
              SastaStore is a digital marketplace
              focused on making useful software,
              AI tools, online subscriptions and
              professional digital services easier
              to discover for customers in Pakistan.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700"
              >
                Explore Products
                <ArrowIcon />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center rounded-xl border border-blue-200 bg-white px-6 py-3.5 text-sm font-extrabold text-blue-700 transition hover:bg-blue-50"
              >
                Contact Our Team
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Who We Are */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-widest text-blue-600">
                Who We Are
              </p>

              <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
                A Simpler Way to Discover
                <span className="text-blue-600">
                  {" "}Digital Products
                </span>
              </h2>

              <p className="mt-5 text-sm leading-8 text-slate-600">
                SastaStore brings digital tools,
                premium subscriptions and online
                services into one convenient
                storefront. Our focus is helping
                customers understand their options
                before choosing a product or plan.
              </p>

              <p className="mt-4 text-sm leading-8 text-slate-600">
                Customers can browse products,
                compare available plans, complete
                checkout through the website and
                track the progress of their orders.
                Payment verification and digital
                product delivery are handled through
                our established order process.
              </p>

              <Link
                href="/categories"
                className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-blue-600 transition hover:text-blue-800"
              >
                Explore Categories
                <ArrowIcon />
              </Link>
            </div>

            <div className="relative rounded-3xl border border-blue-100 bg-white p-7 shadow-lg shadow-blue-100/40 sm:p-9">
              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-sky-100 blur-2xl" />

              <div className="relative">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-sky-500 text-3xl font-black text-white shadow-lg shadow-blue-100">
                  S
                </div>

                <h3 className="mt-6 text-2xl font-extrabold">
                  Our Mission
                </h3>

                <p className="mt-4 text-sm leading-8 text-slate-600">
                  To help make useful digital
                  technology more approachable,
                  affordable and convenient while
                  providing clear product information
                  and accessible customer assistance.
                </p>

                <div className="mt-7 rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
                  <p className="text-xs font-extrabold uppercase tracking-widest text-emerald-700">
                    Our Focus
                  </p>

                  <p className="mt-2 text-lg font-extrabold text-slate-900">
                    Simplicity. Value. Customer Care.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* What We Offer */}
      <section className="border-y border-blue-100 bg-white/70 py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">
              What We Offer
            </p>

            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
              Digital Tools for Different Needs
            </h2>

            <p className="mt-4 text-sm leading-8 text-slate-600">
              Explore a growing range of products
              and services across digital categories.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {offerings.map((item) => (
              <article
                key={item.number}
                className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-sm font-extrabold text-blue-700">
                  {item.number}
                </div>

                <h3 className="mt-6 text-lg font-extrabold">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* How SastaStore Works */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-extrabold uppercase tracking-widest text-blue-600">
              Our Ordering Experience
            </p>

            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
              How SastaStore Works
            </h2>

            <p className="mt-4 text-sm leading-8 text-slate-600">
              A straightforward process from
              product selection to order tracking.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <article
                key={step.number}
                className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-sky-500 text-sm font-extrabold text-white">
                  {step.number}
                </span>

                <h3 className="mt-5 text-lg font-extrabold">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {step.description}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-5 text-center">
            <p className="text-sm leading-7 text-blue-800">
              Payment evidence is reviewed before
              approval. Subscription delivery and
              activation may require manual processing.
            </p>

            <Link
              href="/track"
              className="mt-3 inline-flex items-center gap-2 text-sm font-extrabold text-blue-700 hover:underline"
            >
              Track Your Order
              <ArrowIcon />
            </Link>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="border-y border-blue-100 bg-white/70 py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">
              Our Approach
            </p>

            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
              What Matters to Us
            </h2>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {values.map((value) => (
              <article
                key={value.title}
                className="rounded-3xl border border-blue-100 bg-white p-7 shadow-sm"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-lg font-extrabold text-emerald-700">
                  ✓
                </div>

                <h3 className="mt-5 text-xl font-extrabold">
                  {value.title}
                </h3>

                <p className="mt-3 text-sm leading-8 text-slate-600">
                  {value.description}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Leadership */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-extrabold uppercase tracking-widest text-blue-600">
              Our Leadership
            </p>

            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
              Meet the People Behind SastaStore
            </h2>

            <p className="mt-4 text-sm leading-8 text-slate-600">
              The team helping build and manage
              the SastaStore platform.
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-5xl gap-6 md:grid-cols-2">
            {teamMembers.map((member) => (
              <article
                key={member.name}
                className="group relative overflow-hidden rounded-3xl border border-blue-100 bg-white p-7 shadow-lg shadow-blue-100/30 transition hover:-translate-y-1 hover:shadow-xl sm:p-8"
              >
                <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-sky-100/60 blur-3xl" />

                <div className="relative flex items-center gap-5">
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-600 to-sky-500 text-2xl font-black text-white shadow-lg shadow-blue-100">
                    {member.initials}
                  </div>

                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-widest text-blue-600">
                      {member.role}
                    </p>

                    <h3 className="mt-2 text-xl font-extrabold sm:text-2xl">
                      {member.name}
                    </h3>
                  </div>
                </div>

                <p className="relative mt-6 text-sm leading-8 text-slate-600">
                  {member.description}
                </p>

                <div className="relative mt-6 h-1 w-14 rounded-full bg-gradient-to-r from-blue-600 to-emerald-400" />
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Support CTA */}
      <section className="border-t border-blue-100 py-16">
        <Container>
          <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-sky-600 p-8 text-white shadow-xl shadow-blue-200/50 sm:p-12">
            <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
              <div className="max-w-xl">
                <p className="text-xs font-extrabold uppercase tracking-widest text-blue-100">
                  Get in Touch
                </p>

                <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl">
                  Have Questions About SastaStore?
                </h2>

                <p className="mt-4 text-sm leading-8 text-blue-50">
                  Our support channels are available
                  for questions about products,
                  subscriptions, orders and
                  digital services.
                </p>
              </div>

              <div className="flex w-full flex-col gap-3 sm:w-auto">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3.5 text-sm font-extrabold text-blue-700 transition hover:bg-blue-50"
                >
                  WhatsApp Support
                </a>

                <a
                  href={telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-xl border border-white/50 bg-white/10 px-6 py-3.5 text-sm font-extrabold text-white transition hover:bg-white/20"
                >
                  Telegram @Techboyy0
                </a>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-xl border border-white/50 bg-white/10 px-6 py-3.5 text-sm font-extrabold text-white transition hover:bg-white/20"
                >
                  Contact Page
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}


import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { createWhatsAppUrl } from "@/lib/whatsapp";

export const metadata = {
  title: "Professional Digital Services | SastaStore",
  description:
    "Explore SastaStore digital services in Pakistan, including video editing, graphic design, Shopify store design, website development and custom digital solutions.",
  alternates: {
    canonical: "/services",
  },
};

const services = [
  {
    short: "VE",
    title: "Video Editing",
    description:
      "Professional video editing for YouTube videos, advertisements, social media reels, shorts and other digital content.",
    features: [
      "YouTube Videos",
      "Reels & Shorts",
      "Promotional Content",
    ],
  },
  {
    short: "GD",
    title: "Graphic Designing",
    description:
      "Creative graphic designs for social media, banners, thumbnails, advertisements and brand-related visuals.",
    features: [
      "Social Media Designs",
      "Banners & Thumbnails",
      "Marketing Graphics",
    ],
  },
  {
    short: "SH",
    title: "Shopify Store Designing",
    description:
      "Shopify store setup and design for businesses looking to establish or improve their online shopping experience.",
    features: [
      "Store Design",
      "Product Page Layouts",
      "Store Setup",
    ],
  },
  {
    short: "WD",
    title: "Website Development",
    description:
      "Modern, responsive websites for businesses, brands, online stores and custom digital projects.",
    features: [
      "Responsive Websites",
      "Business Websites",
      "Custom Web Projects",
    ],
  },
  {
    short: "AD",
    title: "Agency Ad Accounts",
    description:
      "Discuss agency advertising account options, availability, requirements and applicable service conditions.",
    features: [
      "Availability Enquiries",
      "Account Requirements",
      "Service Consultation",
    ],
  },
  {
    short: "DS",
    title: "Other Digital Services",
    description:
      "Have a different digital project in mind? Share your requirements and discuss suitable options with our team.",
    features: [
      "Custom Requests",
      "Project Consultation",
      "Digital Solutions",
    ],
  },
];

const steps = [
  {
    number: "01",
    title: "Choose Your Service",
    description:
      "Explore the available services and select the one that matches your project.",
  },
  {
    number: "02",
    title: "Share Requirements",
    description:
      "Contact our team with your goals, references, requirements and preferred timeline.",
  },
  {
    number: "03",
    title: "Discuss the Scope",
    description:
      "Confirm service availability, pricing, deliverables, estimated timeline and other terms.",
  },
  {
    number: "04",
    title: "Proceed When Agreed",
    description:
      "Work begins according to the scope and arrangements confirmed for your specific project.",
  },
];

const faqItems = [
  {
    question: "How can I request a digital service?",
    answer:
      "Choose a service and click Get a Quote. WhatsApp will open with a message related to that service. You can share your requirements with our team.",
  },
  {
    question: "Are prices fixed for every project?",
    answer:
      "Not necessarily. Pricing may vary depending on the scope, complexity, requirements and type of service. Confirm the quotation before proceeding.",
  },
  {
    question: "How long does a project take?",
    answer:
      "Project timelines depend on the work involved and the agreed deliverables. Discuss the expected schedule with our team before confirming a project.",
  },
  {
    question: "Can I request a service that is not listed?",
    answer:
      "Yes. Contact SastaStore with your requirements and our team can discuss whether a suitable solution is available.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Digital Services",
  provider: {
    "@type": "Organization",
    name: "SastaStore",
    url: "https://sastastore.store",
  },
  areaServed: {
    "@type": "Country",
    name: "Pakistan",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "SastaStore Digital Services",
    itemListElement: services.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.title,
        description: service.description,
      },
    })),
  },
};

const facebookUrl =
  "https://www.facebook.com/share/1cbKHVxxJi/";

const telegramUrl = "https://t.me/Techboyy0";

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

export default function ServicesPage() {
  const generalWhatsAppUrl = createWhatsAppUrl(
    "Hello SastaStore, I would like to discuss a digital service project. Please share the available options and quotation process.",
  );

  return (
    <main className="min-h-screen overflow-hidden bg-gradient-to-b from-[#EFF8FF] via-white to-[#ECFDF5] text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema).replace(
            /</g,
            "\\u003c",
          ),
        }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-blue-100 py-16 sm:py-24">
        <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-sky-200/40 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-emerald-200/40 blur-3xl" />

        <Container>
          <div className="relative mx-auto max-w-4xl text-center">
            <span className="inline-flex rounded-full border border-blue-200 bg-white px-5 py-2 text-xs font-extrabold uppercase tracking-widest text-blue-600 shadow-sm">
              SastaStore Digital Services
            </span>

            <h1 className="mt-7 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Creative Ideas.
              <span className="block text-blue-600">
                Digital Solutions.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-sm leading-8 text-slate-600 sm:text-base">
              From video editing and graphic design
              to Shopify stores and website
              development, explore digital services
              for your next project.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href="#services"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700"
              >
                Explore Services
                <ArrowIcon />
              </a>

              <a
                href={generalWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-xl border border-blue-200 bg-white px-6 py-3.5 text-sm font-extrabold text-blue-700 transition hover:bg-blue-50"
              >
                Discuss a Project
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Services */}
      <section
        id="services"
        className="scroll-mt-24 py-16 sm:py-20"
      >
        <Container>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">
                What We Offer
              </p>

              <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
                Our Digital Services
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
                Select a service and contact our team
                for project details and availability.
              </p>
            </div>

            <span className="rounded-full border border-blue-100 bg-white px-5 py-2.5 text-sm font-bold text-blue-700 shadow-sm">
              {services.length} Service Categories
            </span>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.title}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-blue-100 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-100/50"
              >
                <div className="pointer-events-none absolute -right-14 -top-14 h-40 w-40 rounded-full bg-sky-100/70 blur-3xl" />

                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-sky-500 text-base font-extrabold text-white shadow-md shadow-blue-100">
                  {service.short}
                </div>

                <h3 className="relative mt-6 text-xl font-extrabold">
                  {service.title}
                </h3>

                <p className="relative mt-3 text-sm leading-7 text-slate-600">
                  {service.description}
                </p>

                <div className="relative mt-6 flex flex-1 flex-col gap-3">
                  {service.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-3"
                    >
                      <span
                        aria-hidden="true"
                        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-xs font-bold text-emerald-700"
                      >
                        ✓
                      </span>

                      <span className="text-sm font-medium text-slate-600">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <a
                  href={createWhatsAppUrl(
                    `Hello SastaStore, I am interested in your ${service.title} service. I would like to discuss my project requirements and request a quotation.`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-extrabold text-white transition hover:bg-blue-700"
                >
                  Get Details & Quote
                  <ArrowIcon />
                </a>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* How It Works */}
      <section className="border-y border-blue-100 bg-white/70 py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-extrabold uppercase tracking-widest text-blue-600">
              Simple Project Enquiries
            </p>

            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
              How to Get Started
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-600">
              Discuss your requirements with
              SastaStore before confirming any
              custom digital service.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <div
                key={step.number}
                className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-sm font-extrabold text-blue-700">
                  {step.number}
                </div>

                <h3 className="mt-5 text-lg font-extrabold">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Service FAQ */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            <p className="text-center text-xs font-extrabold uppercase tracking-widest text-emerald-600">
              Helpful Information
            </p>

            <h2 className="mt-3 text-center text-3xl font-extrabold sm:text-4xl">
              Service Questions
            </h2>

            <div className="mt-9 space-y-3">
              {faqItems.map((item) => (
                <details
                  key={item.question}
                  className="group overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm open:border-blue-300"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 text-sm font-bold text-slate-900 sm:text-base [&::-webkit-details-marker]:hidden">
                    {item.question}

                    <span
                      aria-hidden="true"
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-lg text-blue-600 transition group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>

                  <div className="border-t border-blue-50 px-5 py-5">
                    <p className="text-sm leading-8 text-slate-600">
                      {item.answer}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Custom Projects */}
      <section className="border-t border-blue-100 bg-white/70 py-14 sm:py-16">
        <Container>
          <div className="rounded-3xl border border-blue-100 bg-white p-8 shadow-lg shadow-blue-100/40 sm:p-10">
            <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
              <div className="max-w-xl">
                <p className="text-xs font-extrabold uppercase tracking-widest text-blue-600">
                  Custom Projects
                </p>

                <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl">
                  Need a Custom Digital Service?
                </h2>

                <p className="mt-4 text-sm leading-8 text-slate-600">
                  Share your project requirements,
                  references, expected deadline and
                  budget preferences. Our team can
                  discuss suitable options and
                  applicable service terms.
                </p>
              </div>

              <div className="flex w-full flex-col gap-3 sm:w-auto">
                <a
                  href={generalWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-extrabold text-white transition hover:bg-blue-700"
                >
                  WhatsApp Enquiry
                </a>

                <a
                  href={telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-xl border border-sky-200 bg-sky-50 px-6 py-3.5 text-sm font-extrabold text-sky-700 transition hover:bg-sky-100"
                >
                  Telegram @Techboyy0
                </a>

                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-xl border border-blue-200 bg-white px-6 py-3.5 text-sm font-extrabold text-blue-700 transition hover:bg-blue-50"
                >
                  Facebook Page
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Bottom CTA */}
      <section className="py-16">
        <Container>
          <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-sky-600 p-8 text-white shadow-xl shadow-blue-200/40 sm:p-12">
            <div className="flex flex-col items-start justify-between gap-7 lg:flex-row lg:items-center">
              <div className="max-w-xl">
                <h2 className="text-2xl font-extrabold sm:text-3xl">
                  Also Looking for Digital Products?
                </h2>

                <p className="mt-4 text-sm leading-7 text-blue-50">
                  Browse SastaStore subscriptions,
                  software and digital tools in
                  our online marketplace.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/products"
                  className="rounded-xl bg-white px-6 py-3.5 text-sm font-extrabold text-blue-700 transition hover:bg-blue-50"
                >
                  Browse Products
                </Link>

                <Link
                  href="/contact"
                  className="rounded-xl border border-white/50 bg-white/10 px-6 py-3.5 text-sm font-extrabold text-white transition hover:bg-white/20"
                >
                  Contact Support
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}

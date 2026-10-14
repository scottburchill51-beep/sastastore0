import { Reveal } from "@/components/common/Reveal";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { createWhatsAppUrl } from "@/lib/whatsapp";

export const metadata = {
  title: "Digital Services | SastaStore",
  description:
    "Professional digital services by SastaStore including video editing, graphic design, Shopify store design, website development and online solutions in Pakistan.",
  alternates: {
    canonical: "/services",
  },
};

const services = [
  {
    short: "VE",
    title: "Video Editing",
    description:
      "Professional editing for YouTube videos, advertisements, reels, shorts and other digital content.",
  },
  {
    short: "GD",
    title: "Graphic Designing",
    description:
      "Creative designs for social media posts, banners, thumbnails, advertisements and brand visuals.",
  },
  {
    short: "SH",
    title: "Shopify Store Designing",
    description:
      "Professional Shopify store setup and design for businesses, products and online brands.",
  },
  {
    short: "WD",
    title: "Website Development",
    description:
      "Modern responsive websites for businesses, brands, online stores and digital projects.",
  },
  {
    short: "AD",
    title: "Agency Ad Accounts",
    description:
      "Discuss available agency advertising account solutions and requirements with our team.",
  },
  {
    short: "DS",
    title: "Other Digital Services",
    description:
      "Need something different? Share your requirements and we will discuss available solutions.",
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

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What digital services does SastaStore provide?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SastaStore provides video editing, graphic designing, Shopify store designing, website development and other digital services.",
      },
    },
    {
      "@type": "Question",
      name: "How can I order a digital service?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Contact SastaStore on WhatsApp with your project requirements and our team will discuss details.",
      },
    },
  ],
};

const facebookUrl = "https://www.facebook.com/share/1cbKHVxxJi/";

export default function ServicesPage() {
  const whatsappUrl = createWhatsAppUrl(
    "Hello, I need a digital service from SastaStore. Please share more details.",
  );

  return (
    <main className="flex-1 overflow-hidden bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([serviceSchema, faqSchema]).replace(
            /</g,
            "\\u003c",
          ),
        }}
      />

      <Section>
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Digital Services"
              title="Professional digital solutions for your next project"
              description="SastaStore helps businesses and creators with creative work, websites, online stores and digital solutions."
            />
          </Reveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <Reveal key={service.title} delay={index * 80}>
                <div className="premium-card rounded-2xl border border-border bg-surface p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-brand/20 bg-brand/10 font-bold text-brand">
                    {service.short}
                  </div>

                  <h2 className="mt-5 text-xl font-semibold">
                    {service.title}
                  </h2>

                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {service.description}
                  </p>

                  <a
                    href={createWhatsAppUrl(
                      `Hello, I am interested in ${service.title} service.`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex text-sm font-semibold text-brand"
                  >
                    Get Details on WhatsApp →
                  </a>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-12 rounded-3xl border border-brand/20 bg-surface p-8">
              <h2 className="text-3xl font-semibold">
                Need a custom digital service?
              </h2>
              <p className="mt-4 text-muted-foreground">
                Share your requirements with SastaStore and we will discuss the
                best solution for your project.
              </p>

              <div className="mt-6 flex gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl bg-brand px-6 py-3 font-semibold text-black"
                >
                  Message on WhatsApp
                </a>

                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-border px-6 py-3 font-semibold"
                >
                  Facebook ↗
                </a>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </main>
  );
}

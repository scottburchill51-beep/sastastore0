import { Reveal } from "@/components/common/Reveal";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { createWhatsAppUrl } from "@/lib/whatsapp";

export const metadata = {
  title: "Digital Services | SastaStore",
  description:
    "Explore SastaStore digital services including video editing, graphic designing, Shopify store design, website development and agency ad accounts.",
};

const services = [
  {
    short: "VE",
    title: "Video Editing",
    description:
      "Professional editing for YouTube videos, advertisements, reels, shorts and other digital content.",
    message:
      "Hello, I am interested in your Video Editing service. Please share more details.",
  },
  {
    short: "GD",
    title: "Graphic Designing",
    description:
      "Creative designs for social media posts, banners, thumbnails, advertisements and other visual content.",
    message:
      "Hello, I am interested in your Graphic Designing service. Please share more details.",
  },
  {
    short: "SH",
    title: "Shopify Store Designing",
    description:
      "Professional Shopify store setup and design for businesses, products and online brands.",
    message:
      "Hello, I am interested in your Shopify Store Designing service. Please share more details.",
  },
  {
    short: "WD",
    title: "Website Development",
    description:
      "Modern and responsive websites for businesses, brands, online stores and digital projects.",
    message:
      "Hello, I am interested in your Website Development service. Please share more details.",
  },
  {
    short: "AD",
    title: "Agency Ad Accounts",
    description:
      "Contact us to discuss available agency advertising account services and your requirements.",
    message:
      "Hello, I need information about Agency Ad Accounts. Please share the available options.",
  },
  {
    short: "DS",
    title: "Other Digital Services",
    description:
      "Need something different? Tell us your requirements and we will discuss the available options.",
    message:
      "Hello, I need a digital service that is not listed on the website. Please help me with my requirements.",
  },
];

const facebookUrl =
  "https://www.facebook.com/share/1cbKHVxxJi/";

export default function ServicesPage() {
  const generalWhatsappUrl = createWhatsAppUrl(
    "Hello, I need a digital service from SastaStore. Please share more details.",
  );

  return (
    <main className="flex-1 overflow-hidden bg-background text-foreground">
      {/* Hero */}
      <Section>
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-brand/20 bg-surface p-8 sm:p-10 lg:p-12">
              <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand/10 blur-3xl" />

              <div className="relative max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
                  Digital Services
                </p>

                <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
                  Digital solutions for your
                  <span className="text-brand"> next project.</span>
                </h1>

                <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                  From creative work to websites and online stores,
                  SastaStore can help with a range of professional digital
                  services.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={generalWhatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-hover"
                  >
                    Discuss Your Project
                  </a>

                  <a
                    href={facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-surface-elevated px-5 py-3 text-sm font-semibold text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/30 hover:text-brand"
                  >
                    Facebook Page
                    <span>↗</span>
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Services */}
      <Section className="border-t border-border">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="What We Do"
              title="Our digital services"
              description="Choose a service below and contact us directly on WhatsApp to discuss your requirements."
            />
          </Reveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => {
              const whatsappUrl = createWhatsAppUrl(
                service.message,
              );

              return (
                <Reveal
                  key={service.title}
                  delay={(index % 3) * 80}
                  className="h-full"
                >
                  <div className="group premium-card relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface p-6">
                    <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

                    <div className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-brand/20 bg-brand/10 text-sm font-bold text-brand transition-all duration-300 group-hover:scale-110">
                      {service.short}
                    </div>

                    <h2 className="relative mt-5 text-xl font-semibold text-foreground transition-colors duration-300 group-hover:text-brand">
                      {service.title}
                    </h2>

                    <p className="relative mt-3 text-sm leading-7 text-muted-foreground">
                      {service.description}
                    </p>

                    <div className="relative mt-auto pt-7">
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-brand"
                      >
                        Get Details on WhatsApp

                        <span className="transition-transform duration-300 group-hover:translate-x-1">
                          →
                        </span>
                      </a>
                    </div>

                    <div className="absolute bottom-0 left-0 h-px w-0 bg-brand transition-all duration-500 group-hover:w-full" />
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Custom Service CTA */}
      <Section className="border-t border-border">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-brand/20 bg-surface p-8 sm:p-10 lg:flex lg:items-center lg:justify-between lg:gap-10">
              <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand/10 blur-3xl" />

              <div className="relative max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
                  Custom Service
                </p>

                <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                  Don&apos;t see the service you need?
                </h2>

                <p className="mt-4 leading-7 text-muted-foreground">
                  Send us your requirements on WhatsApp. Tell us what
                  you need and we&apos;ll discuss the available options
                  with you.
                </p>
              </div>

              <a
                href={generalWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative mt-7 inline-flex w-full items-center justify-center rounded-xl bg-brand px-6 py-3.5 text-sm font-semibold text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-hover sm:w-auto lg:mt-0"
              >
                Message on WhatsApp
              </a>
            </div>
          </Reveal>
        </Container>
      </Section>
    </main>
  );
}
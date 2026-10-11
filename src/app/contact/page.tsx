import { Reveal } from "@/components/common/Reveal";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site";
import { createWhatsAppUrl } from "@/lib/whatsapp";

export const metadata = {
  title: "Contact SastaStore",
  description:
    "Contact SastaStore on WhatsApp for digital tools, subscriptions, digital services, availability, pricing and order support.",
};

const whatsappChannelUrl =
  "https://whatsapp.com/channel/0029Vb7BXu2B4hdMiWIlwY1v";

const facebookUrl =
  "https://www.facebook.com/share/1cbKHVxxJi/";

export default function ContactPage() {
  const generalWhatsAppUrl = createWhatsAppUrl(
    "Hello, I want to contact SastaStore regarding your products and services.",
  );

  const productsWhatsAppUrl = createWhatsAppUrl(
    "Hello, I need information about a SastaStore digital product or premium subscription. Please share the available options.",
  );

  const servicesWhatsAppUrl = createWhatsAppUrl(
    "Hello, I need a digital service from SastaStore. Please share more details with me.",
  );

  return (
    <main className="flex-1 overflow-hidden bg-background text-foreground">
      {/* Contact Intro */}
      <Section>
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Contact"
              title="Let’s get you connected"
              description="Need help with a digital tool, subscription, order or professional digital service? Choose the best way to contact SastaStore."
            />
          </Reveal>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {/* Main WhatsApp */}
            <Reveal className="h-full">
              <div className="group premium-card relative h-full overflow-hidden rounded-3xl border border-brand/20 bg-surface p-7 sm:p-8">
                <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#25D366]/10 blur-3xl" />

                <div className="relative">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#25D366] text-white shadow-lg shadow-[#25D366]/10">
                    <svg
                      viewBox="0 0 32 32"
                      aria-hidden="true"
                      className="h-7 w-7 fill-current"
                    >
                      <path d="M16.02 3C8.84 3 3 8.74 3 15.8c0 2.48.72 4.9 2.08 6.97L3 29l6.47-2.02a13.2 13.2 0 0 0 6.54 1.74h.01C23.2 28.72 29 22.98 29 15.9 29 8.84 23.2 3 16.02 3Zm0 23.55a10.9 10.9 0 0 1-5.57-1.52l-.4-.24-3.83 1.2 1.25-3.72-.26-.42a10.6 10.6 0 0 1-1.7-5.95c0-5.88 4.72-10.66 10.53-10.66 5.81 0 10.52 4.78 10.52 10.66 0 5.88-4.72 10.65-10.54 10.65Z" />
                    </svg>
                  </div>

                  <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-brand">
                    Direct Support
                  </p>

                  <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                    Chat with us on WhatsApp
                  </h2>

                  <p className="mt-3 text-xl font-semibold text-brand">
                    {siteConfig.whatsapp.display}
                  </p>

                  <p className="mt-4 text-sm leading-7 text-muted-foreground">
                    Ask about availability, pricing, plans, subscriptions,
                    orders or any other SastaStore service.
                  </p>

                  <a
                    href={generalWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button-shine mt-6 inline-flex items-center justify-center rounded-xl bg-[#25D366] px-6 py-3.5 text-sm font-bold text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#20bd5a]"
                  >
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            </Reveal>

            {/* WhatsApp Channel */}
            <Reveal delay={100} className="h-full">
              <div className="group premium-card relative h-full overflow-hidden rounded-3xl border border-border bg-surface p-7 sm:p-8">
                <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand/10 opacity-60 blur-3xl" />

                <div className="relative">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-brand/20 bg-brand/10 text-xl font-bold text-brand">
                    WA
                  </div>

                  <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-brand">
                    Stay Updated
                  </p>

                  <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                    Follow our WhatsApp Channel
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-muted-foreground">
                    Follow the official SastaStore WhatsApp Channel for new
                    products, deals, service updates and announcements.
                  </p>

                  <a
                    href={whatsappChannelUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl border border-brand/25 bg-brand/10 px-6 py-3.5 text-sm font-semibold text-brand transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/40 hover:bg-brand/15"
                  >
                    Follow SastaStore Channel
                    <span>↗</span>
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Contact Options */}
      <Section className="border-t border-border">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="How Can We Help?"
              title="Choose what you need"
              description="Use the relevant contact option so we can understand your request quickly."
            />
          </Reveal>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <Reveal className="h-full">
              <div className="group premium-card flex h-full flex-col rounded-2xl border border-border bg-surface p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-brand/20 bg-brand/10 text-sm font-bold text-brand">
                  PR
                </div>

                <h3 className="mt-5 text-xl font-semibold">
                  Products & Subscriptions
                </h3>

                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  Looking for AI tools, premium apps, entertainment,
                  productivity tools, VPNs, software keys or other digital
                  products?
                </p>

                <a
                  href={productsWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold text-brand"
                >
                  Ask about a product
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </div>
            </Reveal>

            <Reveal delay={100} className="h-full">
              <div className="group premium-card flex h-full flex-col rounded-2xl border border-border bg-surface p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-brand/20 bg-brand/10 text-sm font-bold text-brand">
                  DS
                </div>

                <h3 className="mt-5 text-xl font-semibold">
                  Digital Services
                </h3>

                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  Need video editing, graphic designing, Shopify store design,
                  website development, agency ad accounts or another digital
                  service?
                </p>

                <a
                  href={servicesWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold text-brand"
                >
                  Discuss your project
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Social */}
      <Section className="border-t border-border">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-brand/20 bg-surface p-7 sm:p-9 lg:flex lg:items-center lg:justify-between lg:gap-10">
              <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-brand/10 blur-3xl" />

              <div className="relative max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
                  Connect With SastaStore
                </p>

                <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                  Follow us for more updates.
                </h2>

                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  Stay connected with SastaStore through our WhatsApp Channel
                  and Facebook page.
                </p>
              </div>

              <div className="relative mt-6 flex flex-col gap-3 sm:flex-row lg:mt-0">
                <a
                  href={whatsappChannelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-hover"
                >
                  WhatsApp Channel
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
          </Reveal>
        </Container>
      </Section>
    </main>
  );
}
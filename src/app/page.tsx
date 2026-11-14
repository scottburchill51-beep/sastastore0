import Link from "next/link";
import { ArrowRight, BadgeCheck, BookOpen, CheckCircle2, ChevronRight, Headphones, MessageCircle, ShieldCheck, Sparkles, Zap } from "lucide-react";

import { BrandLogoMarquee } from "@/components/product/BrandLogoMarquee";
import { ProductLogo } from "@/components/product/ProductLogo";
import { SmartProductSearch } from "@/components/product/SmartProductSearch";
import { ProductCatalog } from "@/components/product/ProductCatalog";
import { Container } from "@/components/ui/Container";
import { products } from "@/data/products";
import { createWhatsAppUrl } from "@/lib/whatsapp";

export const metadata = {
  title: "SastaStore | Premium Digital Tools at Sasta Prices",
  description: "Shop AI tools, creative software, productivity subscriptions and digital services at SastaStore.",
};

const featuredProducts = products.filter((product) => product.featured || product.popular).slice(0, 6);
const spotlightProduct = featuredProducts[0];
const categories = [
  { title: "AI & Automation", subtitle: "ChatGPT, Claude, AI assistants", icon: "✦", href: "/categories?category=ai-tools", count: "AI tools" },
  { title: "Design & Video", subtitle: "Canva, CapCut, Figma and more", icon: "◈", href: "/categories?category=design-creative", count: "Creative tools" },
  { title: "Work & Productivity", subtitle: "Writing, planning and workflow", icon: "▤", href: "/categories?category=productivity-business", count: "Work tools" },
  { title: "Learning", subtitle: "Courses and skill development", icon: "⌘", href: "/courses", count: "Learning" },
];

const benefits = [
  { icon: ShieldCheck, title: "Clear plan details", text: "Check duration, features and terms before ordering." },
  { icon: MessageCircle, title: "WhatsApp ordering", text: "Talk to our team to confirm your order." },
  { icon: Headphones, title: "Customer assistance", text: "Get help choosing the right digital product." },
];

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-PK").format(price);
}

export default function HomePage() {
  const whatsappUrl = createWhatsAppUrl("Hello SastaStore, I want help choosing a digital product.");
  return (
    <main className="min-h-screen overflow-hidden bg-[#f4f7ff] text-[#172554]">
      <div className="border-b border-[#bfdbfe] bg-[#1e3a8a] text-[#eff6ff]">
        <Container>
          <div className="flex min-h-9 items-center justify-center gap-x-6 gap-y-1 overflow-hidden text-[10px] font-bold uppercase tracking-[.12em] sm:justify-between sm:text-[11px]">
            <div className="flex animate-[ticker_28s_linear_infinite] items-center gap-6 whitespace-nowrap">
              <span className="inline-flex items-center gap-2"><Zap className="h-3.5 w-3.5 text-[#93c5fd]" /> Digital tools at affordable prices</span>
              <span className="text-[#93c5fd]">✦</span>
              <span>WhatsApp order assistance</span>
              <span className="text-[#93c5fd]">✦</span>
              <span>Explore AI, design and productivity tools</span>
              <span className="text-[#93c5fd]">✦</span>
              <span>Digital courses and learning resources</span>
            </div>
          </div>
        </Container>
      </div>

      <section className="relative overflow-hidden bg-[#1e40af] text-white">
        <div className="absolute inset-0 opacity-[.12] [background-image:radial-gradient(#bfdbfe_0.7px,transparent_0.7px)] [background-size:18px_18px]" />
        <div className="absolute -right-32 -top-44 h-[34rem] w-[34rem] rounded-full border border-white/[.08]" />
        <div className="absolute -right-16 -top-28 h-[25rem] w-[25rem] rounded-full border border-white/[.08]" />
        <Container>
          <div className="relative grid min-h-[530px] items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.04fr_.96fr] lg:py-24">
            <div className="animate-fade-up max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#60a5fa]/40 bg-[#60a5fa]/10 px-4 py-2 text-[10px] font-extrabold uppercase tracking-[.18em] text-[#dbeafe]">
                <span className="status-dot h-2 w-2 rounded-full bg-[#dbeafe]" />
                SastaStore digital marketplace
              </div>
              <h1 className="mt-6 text-[2.65rem] font-black leading-[1.05] tracking-[-.045em] sm:text-6xl lg:text-[4.35rem]">
                Premium tools.
                <span className="mt-1 block text-[#60a5fa]">Smarter prices.</span>
              </h1>
              <p className="mt-6 max-w-xl text-sm leading-7 text-[#dbeafe] sm:text-base sm:leading-8">
                Find the digital tools you need for creating, working and growing. Explore available plans, compare options and order with help from our team.
              </p>
              <div className="mt-7 max-w-xl rounded-2xl bg-white p-2 shadow-[0_18px_50px_rgba(0,0,0,.2)]">
                <SmartProductSearch />
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#popular-products" className="button-shine inline-flex min-h-12 items-center gap-2 rounded-xl bg-[#60a5fa] px-6 py-3 text-sm font-extrabold text-[#172554] transition hover:-translate-y-0.5 hover:bg-[#93c5fd]">
                  Browse Products <ArrowRight className="h-4 w-4" />
                </a>
                <a href={whatsappUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-white/25 bg-white/[.07] px-6 py-3 text-sm font-bold text-white transition hover:border-[#60a5fa] hover:bg-white/[.13]">
                  <MessageCircle className="h-4 w-4" /> Chat with us
                </a>
              </div>
              <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3 text-xs font-semibold text-[#dbeafe]">
                <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#60a5fa]" /> Product details before ordering</span>
                <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#60a5fa]" /> Local PKR prices</span>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[510px] animate-fade-up [animation-delay:160ms]">
              <div className="absolute -inset-5 rounded-[2rem] bg-[#60a5fa]/10 blur-2xl" />
              <div className="relative overflow-hidden rounded-[1.65rem] border border-white/15 bg-[#ffffff] p-4 text-[#172554] shadow-[0_30px_80px_rgba(0,0,0,.32)] sm:p-5">
                <div className="flex items-center justify-between border-b border-[#dbe5f5] pb-4">
                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-[#64748b]">Popular right now</p>
                    <h2 className="mt-1 text-lg font-black tracking-tight">Explore customer favourites</h2>
                  </div>
                  <span className="rounded-xl bg-[#eff6ff] p-3 text-[#1d4ed8]"><Sparkles className="h-5 w-5" /></span>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {featuredProducts.slice(0, 4).map((product, index) => (
                    <Link key={product.slug} href={`/products/${encodeURIComponent(product.slug)}`} className="group relative rounded-xl border border-[#dbe5f5] bg-white p-3 transition duration-300 hover:-translate-y-1 hover:border-[#93c5fd] hover:shadow-lg">
                      <div className="flex items-start justify-between gap-2">
                        <ProductLogo name={product.name} logo={product.logo} priority={index < 2} />
                        <span className="rounded-full bg-[#eff6ff] px-2 py-1 text-[9px] font-extrabold uppercase tracking-wide text-[#1d4ed8]">{product.badge || "Featured"}</span>
                      </div>
                      <h3 className="mt-3 line-clamp-1 text-sm font-extrabold">{product.name}</h3>
                      <p className="mt-1 text-[11px] text-[#64748b]">{product.plans.length > 1 ? `${product.plans.length} plans available` : product.plans[0]?.duration || "Digital access"}</p>
                      <div className="mt-3 flex items-center justify-between border-t border-[#eaf0ff] pt-3">
                        <span className="text-[10px] text-[#64748b]">From</span>
                        <span className="text-sm font-black text-[#1d4ed8]">Rs. {formatPrice(Math.min(...product.plans.map((plan) => plan.price)))}</span>
                      </div>
                      <span className="absolute bottom-3 right-3 opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100"><ChevronRight className="h-4 w-4 text-[#1d4ed8]" /></span>
                    </Link>
                  ))}
                </div>
                <Link href="/products" className="mt-4 flex items-center justify-between rounded-xl bg-[#1e40af] px-4 py-3 text-xs font-extrabold text-white transition hover:bg-[#1d4ed8]">
                  View the complete catalogue <ArrowRight className="h-4 w-4 text-[#60a5fa]" />
                </Link>
              </div>
              <div className="absolute -bottom-5 -left-5 hidden items-center gap-3 rounded-xl border border-[#dbe5f5] bg-white px-4 py-3 text-[#172554] shadow-xl sm:flex">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#eff6ff] text-[#1d4ed8]"><BadgeCheck className="h-5 w-5" /></span>
                <span><span className="block text-xs font-extrabold">Need help deciding?</span><span className="mt-1 block text-[10px] text-[#64748b]">Talk to our support team</span></span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="relative z-10 -mt-1 border-b border-[#dbe5f5] bg-white py-5 shadow-[0_8px_24px_rgba(31,58,41,.04)]">
        <Container>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-7">
            {[
              ["Catalogue", `${products.length}+`, "Digital products"],
              ["Pricing", "PKR", "Local currency"],
              ["Ordering", "WhatsApp", "Human assistance"],
              ["Selection", "Multi-plan", "Options on selected tools"],
            ].map(([label, value, caption]) => (
              <div key={label} className="flex items-center gap-3 border-r border-[#eaf0ff] last:border-0 sm:pl-2">
                <span className="hidden h-10 w-10 items-center justify-center rounded-xl bg-[#edf4ec] text-[#1d4ed8] sm:flex"><BadgeCheck className="h-5 w-5" /></span>
                <div><p className="text-[10px] font-bold uppercase tracking-[.13em] text-[#64748b]">{label}</p><p className="mt-0.5 text-lg font-black text-[#172554] sm:text-xl">{value}</p><p className="text-[10px] text-[#64748b]">{caption}</p></div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <BrandLogoMarquee />

      {spotlightProduct && (
        <section className="bg-white py-12 sm:py-16">
          <Container>
            <div className="overflow-hidden rounded-[1.5rem] border border-[#dfe7dc] bg-[#f4f7ff] shadow-sm">
              <div className="grid items-center gap-7 p-6 sm:p-9 lg:grid-cols-[.85fr_1.15fr] lg:p-11">
                <div className="flex min-h-[230px] items-center justify-center rounded-2xl bg-[#eaf0ff] p-8">
                  <div className="rounded-2xl bg-white p-6 shadow-[0_12px_35px_rgba(22,54,34,.09)] transition duration-500 hover:scale-105">
                    <ProductLogo name={spotlightProduct.name} logo={spotlightProduct.logo} size="large" priority />
                  </div>
                </div>
                <div>
                  <p className="inline-flex items-center gap-2 rounded-full bg-[#60a5fa]/25 px-3 py-1.5 text-[10px] font-black uppercase tracking-[.16em] text-[#1e40af]"><Sparkles className="h-3.5 w-3.5" /> Featured pick</p>
                  <h2 className="mt-4 text-2xl font-black tracking-tight text-[#172554] sm:text-3xl">{spotlightProduct.name}</h2>
                  <p className="mt-3 max-w-xl text-sm leading-7 text-[#64748b]">{spotlightProduct.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {spotlightProduct.features.slice(0, 3).map((feature) => <span key={feature} className="inline-flex items-center gap-1.5 rounded-lg border border-[#dbe5f5] bg-white px-3 py-2 text-[11px] font-semibold text-[#1d4ed8]"><CheckCircle2 className="h-3.5 w-3.5 text-[#2563eb]" />{feature}</span>)}
                  </div>
                  <div className="mt-6 flex flex-col gap-4 border-t border-[#dfe7dc] pt-5 sm:flex-row sm:items-center sm:justify-between">
                    <div><p className="text-[10px] font-bold uppercase tracking-wider text-[#8a968b]">Starting from</p><p className="mt-1 text-2xl font-black text-[#1d4ed8]">Rs. {formatPrice(Math.min(...spotlightProduct.plans.map((plan) => plan.price)))}</p></div>
                    <Link href={`/products/${encodeURIComponent(spotlightProduct.slug)}`} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1e40af] px-6 py-3.5 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-[#1d4ed8]">View product details <ArrowRight className="h-4 w-4 text-[#60a5fa]" /></Link>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>
      )}

      <section className="bg-[#f4f7ff] py-14 sm:py-16">
        <Container>
          <div className="flex items-end justify-between gap-4">
            <div><p className="text-[10px] font-extrabold uppercase tracking-[.2em] text-[#2563eb]">Find what you need</p><h2 className="mt-2 text-2xl font-black tracking-tight text-[#172554] sm:text-3xl">Shop by category</h2><p className="mt-2 text-sm text-[#64748b]">Browse tools by the way you work.</p></div>
            <Link href="/categories" className="hidden items-center gap-2 text-sm font-extrabold text-[#1d4ed8] transition hover:gap-3 sm:inline-flex">All categories <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="mt-7 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {categories.map((category, index) => (
              <Link key={category.title} href={category.href} className={`category-tile group relative overflow-hidden rounded-2xl border border-[#dfe7dc] bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-[#93c5fd] hover:shadow-[0_16px_35px_rgba(33,68,43,.09)] ${index === 0 ? "animate-fade-up" : ""}`}>
                <div className="flex items-center justify-between"><span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#edf4ec] text-2xl font-black text-[#1d4ed8] transition group-hover:rotate-[-5deg] group-hover:bg-[#dbeafe]">{category.icon}</span><span className="text-[9px] font-bold uppercase tracking-wider text-[#64748b]">{category.count}</span></div>
                <h3 className="mt-5 text-sm font-extrabold text-[#172554]">{category.title}</h3>
                <p className="mt-1 text-xs leading-5 text-[#7b877d]">{category.subtitle}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-[11px] font-extrabold text-[#1d4ed8]">Explore <ChevronRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" /></span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section id="popular-products" className="scroll-mt-24 border-y border-[#1e40af] bg-[#1e3a8a] py-14 text-white sm:py-16">
        <Container>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div><p className="text-[10px] font-extrabold uppercase tracking-[.2em] text-[#60a5fa]">Live store catalogue</p><h2 className="mt-2 text-2xl font-black tracking-tight text-white sm:text-3xl">Explore digital products</h2><p className="mt-2 text-sm text-[#dbeafe]">Browse the latest products, compare plans and filter by category or price.</p></div>
            <Link href="/products" className="inline-flex items-center gap-2 rounded-xl border border-[#60a5fa]/50 bg-[#60a5fa] px-4 py-2.5 text-sm font-extrabold text-[#1e3a8a] transition hover:bg-[#93c5fd]">View all products <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <ProductCatalog />
        </Container>
      </section>

      <section className="bg-[#f4f7ff] py-14 sm:py-16">
        <Container>
          <div className="relative overflow-hidden rounded-[1.5rem] bg-[#1e40af] px-6 py-9 text-white sm:px-10 sm:py-12">
            <div className="absolute -right-10 -top-20 h-64 w-64 rounded-full border border-white/10" />
            <div className="absolute -right-1 -top-11 h-44 w-44 rounded-full border border-[#60a5fa]/20" />
            <div className="relative flex flex-col items-start justify-between gap-7 lg:flex-row lg:items-center">
              <div className="max-w-2xl"><p className="text-[10px] font-extrabold uppercase tracking-[.2em] text-[#60a5fa]">SastaStore learning</p><h2 className="mt-3 text-2xl font-black sm:text-3xl">Your next skill starts here.</h2><p className="mt-3 text-sm leading-7 text-[#dbeafe]">Explore course listings in AI, design, marketing, freelancing and more. Review the details and ask our team about access.</p></div>
              <Link href="/courses" className="button-shine inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#60a5fa] px-6 py-3.5 text-sm font-extrabold text-[#172554] transition hover:-translate-y-0.5 hover:bg-[#93c5fd]">Explore Courses <BookOpen className="h-4 w-4" /></Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-[#dbe5f5] bg-white py-14 sm:py-16">
        <Container>
          <div className="mx-auto max-w-2xl text-center"><p className="text-[10px] font-extrabold uppercase tracking-[.2em] text-[#2563eb]">Why SastaStore</p><h2 className="mt-2 text-2xl font-black text-[#172554] sm:text-3xl">A simple way to shop digital</h2><p className="mt-3 text-sm leading-7 text-[#64748b]">Know what you are selecting, confirm the details and get help when you need it.</p></div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {benefits.map(({ icon: Icon, title, text }) => <div key={title} className="rounded-2xl border border-[#dbe5f5] bg-[#ffffff] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#93c5fd] hover:shadow-lg"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eff6ff] text-[#1d4ed8]"><Icon className="h-5 w-5" /></span><h3 className="mt-4 text-sm font-extrabold text-[#172554]">{title}</h3><p className="mt-2 text-sm leading-6 text-[#64748b]">{text}</p></div>)}
          </div>
        </Container>
      </section>

      <section className="border-y border-[#dbe5f5] bg-white py-14 sm:py-16">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[10px] font-extrabold uppercase tracking-[.2em] text-[#2563eb]">Quick answers</p>
            <h2 className="mt-2 text-2xl font-black text-[#172554] sm:text-3xl">Frequently asked questions</h2>
            <p className="mt-3 text-sm leading-7 text-[#64748b]">A few helpful details before you place an order.</p>
          </div>
          <div className="mx-auto mt-8 max-w-3xl divide-y divide-[#e5ebe3] rounded-2xl border border-[#dfe7dc] bg-[#ffffff] px-5 sm:px-7">
            {[
              ["How do I place an order?", "Open the product page, review the available plans and use the WhatsApp order option to confirm your selection with our team."],
              ["Are all product plans always available?", "Availability can change. Please contact our team to confirm the current plan, price and terms before making payment."],
              ["How will I receive my product?", "Delivery or activation instructions depend on the product. Our team will explain the process when confirming your order."],
              ["Can I ask for help before ordering?", "Yes. Contact SastaStore on WhatsApp with the tool name and what you need help with."],
            ].map(([question, answer]) => (
              <details key={question} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-sm font-extrabold text-[#263d2d] marker:hidden">
                  {question}
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#eff6ff] text-[#1d4ed8] transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 max-w-2xl pr-8 text-sm leading-7 text-[#64748b]">{answer}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-[#f4f7ff] py-12 sm:py-14">
        <Container>
          <div className="flex flex-col items-center justify-between gap-5 rounded-2xl border border-[#dfe7dc] bg-white p-6 text-center shadow-sm sm:flex-row sm:text-left sm:p-8">
            <div><h2 className="text-xl font-black text-[#172554]">Need help finding the right tool?</h2><p className="mt-2 text-sm text-[#64748b]">Tell us what you need and our team can help you compare available options.</p></div>
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#1e40af] px-6 py-3.5 text-sm font-extrabold text-white transition hover:bg-[#1d4ed8]"><MessageCircle className="h-4 w-4" /> Ask on WhatsApp</a>
          </div>
        </Container>
      </section>
    </main>
  );
}

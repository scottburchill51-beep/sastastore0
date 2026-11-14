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
    <main className="min-h-screen overflow-hidden bg-[#f5f6f4] text-[#17211d]">
      <div className="border-b border-[#263b32] bg-[#10251e] text-[#f7f2e8]">
        <Container>
          <div className="flex min-h-9 items-center justify-center gap-x-6 gap-y-1 overflow-hidden text-[10px] font-bold uppercase tracking-[.12em] sm:justify-between sm:text-[11px]">
            <div className="flex animate-[ticker_28s_linear_infinite] items-center gap-6 whitespace-nowrap">
              <span className="inline-flex items-center gap-2"><Zap className="h-3.5 w-3.5 text-[#e7bd67]" /> Digital tools at affordable prices</span>
              <span className="text-[#e7bd67]">✦</span>
              <span>WhatsApp order assistance</span>
              <span className="text-[#e7bd67]">✦</span>
              <span>Explore AI, design and productivity tools</span>
              <span className="text-[#e7bd67]">✦</span>
              <span>Digital courses and learning resources</span>
            </div>
          </div>
        </Container>
      </div>

      <section className="relative overflow-hidden bg-[#12382d] text-white">
        <div className="absolute inset-0 opacity-[.12] [background-image:radial-gradient(#d7e7d8_0.7px,transparent_0.7px)] [background-size:18px_18px]" />
        <div className="absolute -right-32 -top-44 h-[34rem] w-[34rem] rounded-full border border-white/[.08]" />
        <div className="absolute -right-16 -top-28 h-[25rem] w-[25rem] rounded-full border border-white/[.08]" />
        <Container>
          <div className="relative grid min-h-[530px] items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.04fr_.96fr] lg:py-24">
            <div className="animate-fade-up max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#e8c875]/40 bg-[#e8c875]/10 px-4 py-2 text-[10px] font-extrabold uppercase tracking-[.18em] text-[#f4d992]">
                <span className="status-dot h-2 w-2 rounded-full bg-[#f4d992]" />
                SastaStore digital marketplace
              </div>
              <h1 className="mt-6 text-[2.65rem] font-black leading-[1.05] tracking-[-.045em] sm:text-6xl lg:text-[4.35rem]">
                Premium tools.
                <span className="mt-1 block text-[#e8c875]">Smarter prices.</span>
              </h1>
              <p className="mt-6 max-w-xl text-sm leading-7 text-[#d4e2d8] sm:text-base sm:leading-8">
                Find the digital tools you need for creating, working and growing. Explore available plans, compare options and order with help from our team.
              </p>
              <div className="mt-7 max-w-xl rounded-2xl bg-white p-2 shadow-[0_18px_50px_rgba(0,0,0,.2)]">
                <SmartProductSearch />
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#popular-products" className="button-shine inline-flex min-h-12 items-center gap-2 rounded-xl bg-[#e8c875] px-6 py-3 text-sm font-extrabold text-[#1c3025] transition hover:-translate-y-0.5 hover:bg-[#f3d994]">
                  Browse Products <ArrowRight className="h-4 w-4" />
                </a>
                <a href={whatsappUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-white/25 bg-white/[.07] px-6 py-3 text-sm font-bold text-white transition hover:border-[#e8c875] hover:bg-white/[.13]">
                  <MessageCircle className="h-4 w-4" /> Chat with us
                </a>
              </div>
              <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3 text-xs font-semibold text-[#d4e2d8]">
                <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#e8c875]" /> Product details before ordering</span>
                <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#e8c875]" /> Local PKR prices</span>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[510px] animate-fade-up [animation-delay:160ms]">
              <div className="absolute -inset-5 rounded-[2rem] bg-[#e8c875]/10 blur-2xl" />
              <div className="relative overflow-hidden rounded-[1.65rem] border border-white/15 bg-[#f7f8f5] p-4 text-[#1b2b23] shadow-[0_30px_80px_rgba(0,0,0,.32)] sm:p-5">
                <div className="flex items-center justify-between border-b border-[#e4e8e1] pb-4">
                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-[#718276]">Popular right now</p>
                    <h2 className="mt-1 text-lg font-black tracking-tight">Explore customer favourites</h2>
                  </div>
                  <span className="rounded-xl bg-[#e9f0e9] p-3 text-[#286046]"><Sparkles className="h-5 w-5" /></span>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {featuredProducts.slice(0, 4).map((product, index) => (
                    <Link key={product.slug} href={`/products/${encodeURIComponent(product.slug)}`} className="group relative rounded-2xl border border-[#e1e7df] bg-white p-4 shadow-[0_5px_18px_rgba(23,55,46,.04)] transition duration-300 hover:-translate-y-1 hover:border-[#b5c8ad] hover:shadow-[0_16px_32px_rgba(23,55,46,.12)]">
                      <div className="flex items-start justify-between gap-2">
                        <ProductLogo name={product.name} logo={product.logo} size="large" priority={index < 2} />
                        <span className="rounded-full bg-[#eff4ed] px-2 py-1 text-[9px] font-extrabold uppercase tracking-wide text-[#477052]">{product.badge || "Featured"}</span>
                      </div>
                      <h3 className="mt-4 line-clamp-1 text-sm font-extrabold tracking-tight">{product.name}</h3>
                      <p className="mt-1 text-[11px] text-[#7b887e]">{product.plans.length > 1 ? `${product.plans.length} plans available` : product.plans[0]?.duration || "Digital access"}</p>
                      <div className="mt-3 flex items-center justify-between border-t border-[#edf0eb] pt-3">
                        <span className="text-[10px] text-[#829086]">From</span>
                        <span className="text-sm font-black text-[#24583d]">Rs. {formatPrice(Math.min(...product.plans.map((plan) => plan.price)))}</span>
                      </div>
                      <span className="absolute bottom-3 right-3 opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100"><ChevronRight className="h-4 w-4 text-[#24583d]" /></span>
                    </Link>
                  ))}
                </div>
                <Link href="/products" className="mt-4 flex items-center justify-between rounded-xl bg-[#173d30] px-4 py-3 text-xs font-extrabold text-white transition hover:bg-[#24583d]">
                  View the complete catalogue <ArrowRight className="h-4 w-4 text-[#e8c875]" />
                </Link>
              </div>
              <div className="absolute -bottom-5 -left-5 hidden items-center gap-3 rounded-xl border border-[#dfe8df] bg-white px-4 py-3 text-[#1d3328] shadow-xl sm:flex">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#eaf2e8] text-[#24583d]"><BadgeCheck className="h-5 w-5" /></span>
                <span><span className="block text-xs font-extrabold">Need help deciding?</span><span className="mt-1 block text-[10px] text-[#738176]">Talk to our support team</span></span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="relative z-10 -mt-1 border-b border-[#e1e8df] bg-white py-5 shadow-[0_8px_24px_rgba(31,58,41,.04)]">
        <Container>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-7">
            {[
              ["Catalogue", `${products.length}+`, "Digital products"],
              ["Pricing", "PKR", "Local currency"],
              ["Ordering", "WhatsApp", "Human assistance"],
              ["Selection", "Multi-plan", "Options on selected tools"],
            ].map(([label, value, caption]) => (
              <div key={label} className="flex items-center gap-3 border-r border-[#edf0eb] last:border-0 sm:pl-2">
                <span className="hidden h-10 w-10 items-center justify-center rounded-xl bg-[#edf4ec] text-[#2c6444] sm:flex"><BadgeCheck className="h-5 w-5" /></span>
                <div><p className="text-[10px] font-bold uppercase tracking-[.13em] text-[#8b978d]">{label}</p><p className="mt-0.5 text-lg font-black text-[#203d2b] sm:text-xl">{value}</p><p className="text-[10px] text-[#7d887f]">{caption}</p></div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <BrandLogoMarquee />

      {spotlightProduct && (
        <section className="bg-white py-12 sm:py-16">
          <Container>
            <div className="overflow-hidden rounded-[1.5rem] border border-[#dfe7dc] bg-[#f5f7f3] shadow-sm">
              <div className="grid items-center gap-7 p-6 sm:p-9 lg:grid-cols-[.85fr_1.15fr] lg:p-11">
                <div className="flex min-h-[230px] items-center justify-center rounded-2xl bg-[#e8efe6] p-8">
                  <div className="rounded-2xl bg-white p-6 shadow-[0_12px_35px_rgba(22,54,34,.09)] transition duration-500 hover:scale-105">
                    <ProductLogo name={spotlightProduct.name} logo={spotlightProduct.logo} size="large" priority />
                  </div>
                </div>
                <div>
                  <p className="inline-flex items-center gap-2 rounded-full bg-[#e8c875]/25 px-3 py-1.5 text-[10px] font-black uppercase tracking-[.16em] text-[#765d24]"><Sparkles className="h-3.5 w-3.5" /> Featured pick</p>
                  <h2 className="mt-4 text-2xl font-black tracking-tight text-[#1b2d22] sm:text-3xl">{spotlightProduct.name}</h2>
                  <p className="mt-3 max-w-xl text-sm leading-7 text-[#748076]">{spotlightProduct.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {spotlightProduct.features.slice(0, 3).map((feature) => <span key={feature} className="inline-flex items-center gap-1.5 rounded-lg border border-[#dce6d9] bg-white px-3 py-2 text-[11px] font-semibold text-[#506b57]"><CheckCircle2 className="h-3.5 w-3.5 text-[#39704b]" />{feature}</span>)}
                  </div>
                  <div className="mt-6 flex flex-col gap-4 border-t border-[#dfe7dc] pt-5 sm:flex-row sm:items-center sm:justify-between">
                    <div><p className="text-[10px] font-bold uppercase tracking-wider text-[#8a968b]">Starting from</p><p className="mt-1 text-2xl font-black text-[#24583d]">Rs. {formatPrice(Math.min(...spotlightProduct.plans.map((plan) => plan.price)))}</p></div>
                    <Link href={`/products/${encodeURIComponent(spotlightProduct.slug)}`} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#173d30] px-6 py-3.5 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-[#285b3c]">View product details <ArrowRight className="h-4 w-4 text-[#e8c875]" /></Link>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>
      )}

      <section className="bg-[#f5f6f4] py-14 sm:py-16">
        <Container>
          <div className="flex items-end justify-between gap-4">
            <div><p className="text-[10px] font-extrabold uppercase tracking-[.2em] text-[#54775d]">Find what you need</p><h2 className="mt-2 text-2xl font-black tracking-tight text-[#1b2d22] sm:text-3xl">Shop by category</h2><p className="mt-2 text-sm text-[#778279]">Browse tools by the way you work.</p></div>
            <Link href="/categories" className="hidden items-center gap-2 text-sm font-extrabold text-[#285b3c] transition hover:gap-3 sm:inline-flex">All categories <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="mt-7 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {categories.map((category, index) => (
              <Link key={category.title} href={category.href} className={`category-tile group relative overflow-hidden rounded-2xl border border-[#dfe7dc] bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-[#9eb69e] hover:shadow-[0_16px_35px_rgba(33,68,43,.09)] ${index === 0 ? "animate-fade-up" : ""}`}>
                <div className="flex items-center justify-between"><span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#edf4ec] text-2xl font-black text-[#285b3c] transition group-hover:rotate-[-5deg] group-hover:bg-[#e3eee1]">{category.icon}</span><span className="text-[9px] font-bold uppercase tracking-wider text-[#8b978d]">{category.count}</span></div>
                <h3 className="mt-5 text-sm font-extrabold text-[#203d2b]">{category.title}</h3>
                <p className="mt-1 text-xs leading-5 text-[#7b877d]">{category.subtitle}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-[11px] font-extrabold text-[#2c6444]">Explore <ChevronRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" /></span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section id="popular-products" className="scroll-mt-24 border-y border-[#e3e9e1] bg-white py-14 sm:py-16">
        <Container>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div><p className="text-[10px] font-extrabold uppercase tracking-[.2em] text-[#54775d]">Hand-picked for you</p><h2 className="mt-2 text-2xl font-black tracking-tight text-[#1b2d22] sm:text-3xl">Popular digital products</h2><p className="mt-2 text-sm text-[#778279]">Explore available plans and product information.</p></div>
            <Link href="/products" className="inline-flex items-center gap-2 text-sm font-extrabold text-[#285b3c] transition hover:gap-3">View all products <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <ProductCatalog />
        </Container>
      </section>

      <section className="bg-[#f5f6f4] py-14 sm:py-16">
        <Container>
          <div className="relative overflow-hidden rounded-[1.5rem] bg-[#173d30] px-6 py-9 text-white sm:px-10 sm:py-12">
            <div className="absolute -right-10 -top-20 h-64 w-64 rounded-full border border-white/10" />
            <div className="absolute -right-1 -top-11 h-44 w-44 rounded-full border border-[#e8c875]/20" />
            <div className="relative flex flex-col items-start justify-between gap-7 lg:flex-row lg:items-center">
              <div className="max-w-2xl"><p className="text-[10px] font-extrabold uppercase tracking-[.2em] text-[#e8c875]">SastaStore learning</p><h2 className="mt-3 text-2xl font-black sm:text-3xl">Your next skill starts here.</h2><p className="mt-3 text-sm leading-7 text-[#d4e2d8]">Explore course listings in AI, design, marketing, freelancing and more. Review the details and ask our team about access.</p></div>
              <Link href="/courses" className="button-shine inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#e8c875] px-6 py-3.5 text-sm font-extrabold text-[#1c3025] transition hover:-translate-y-0.5 hover:bg-[#f3d994]">Explore Courses <BookOpen className="h-4 w-4" /></Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-[#e3e9e1] bg-white py-14 sm:py-16">
        <Container>
          <div className="mx-auto max-w-2xl text-center"><p className="text-[10px] font-extrabold uppercase tracking-[.2em] text-[#54775d]">Why SastaStore</p><h2 className="mt-2 text-2xl font-black text-[#1b2d22] sm:text-3xl">A simple way to shop digital</h2><p className="mt-3 text-sm leading-7 text-[#778279]">Know what you are selecting, confirm the details and get help when you need it.</p></div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {benefits.map(({ icon: Icon, title, text }) => <div key={title} className="rounded-2xl border border-[#e2e9df] bg-[#fafbf9] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#b8cbb6] hover:shadow-lg"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e9f1e7] text-[#285b3c]"><Icon className="h-5 w-5" /></span><h3 className="mt-4 text-sm font-extrabold text-[#203d2b]">{title}</h3><p className="mt-2 text-sm leading-6 text-[#778279]">{text}</p></div>)}
          </div>
        </Container>
      </section>

      <section className="border-y border-[#e3e9e1] bg-white py-14 sm:py-16">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[10px] font-extrabold uppercase tracking-[.2em] text-[#54775d]">Quick answers</p>
            <h2 className="mt-2 text-2xl font-black text-[#1b2d22] sm:text-3xl">Frequently asked questions</h2>
            <p className="mt-3 text-sm leading-7 text-[#778279]">A few helpful details before you place an order.</p>
          </div>
          <div className="mx-auto mt-8 max-w-3xl divide-y divide-[#e5ebe3] rounded-2xl border border-[#dfe7dc] bg-[#fafbf9] px-5 sm:px-7">
            {[
              ["How do I place an order?", "Open the product page, review the available plans and use the WhatsApp order option to confirm your selection with our team."],
              ["Are all product plans always available?", "Availability can change. Please contact our team to confirm the current plan, price and terms before making payment."],
              ["How will I receive my product?", "Delivery or activation instructions depend on the product. Our team will explain the process when confirming your order."],
              ["Can I ask for help before ordering?", "Yes. Contact SastaStore on WhatsApp with the tool name and what you need help with."],
            ].map(([question, answer]) => (
              <details key={question} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-sm font-extrabold text-[#263d2d] marker:hidden">
                  {question}
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#e9f1e7] text-[#285b3c] transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 max-w-2xl pr-8 text-sm leading-7 text-[#778279]">{answer}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-[#f5f6f4] py-12 sm:py-14">
        <Container>
          <div className="flex flex-col items-center justify-between gap-5 rounded-2xl border border-[#dfe7dc] bg-white p-6 text-center shadow-sm sm:flex-row sm:text-left sm:p-8">
            <div><h2 className="text-xl font-black text-[#203d2b]">Need help finding the right tool?</h2><p className="mt-2 text-sm text-[#778279]">Tell us what you need and our team can help you compare available options.</p></div>
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#173d30] px-6 py-3.5 text-sm font-extrabold text-white transition hover:bg-[#285b3c]"><MessageCircle className="h-4 w-4" /> Ask on WhatsApp</a>
          </div>
        </Container>
      </section>
    </main>
  );
}

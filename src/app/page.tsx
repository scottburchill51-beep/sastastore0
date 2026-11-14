import Link from "next/link";
import { ArrowRight, BadgeCheck, BookOpen, Clock3, Headphones, ShieldCheck, Sparkles, Zap } from "lucide-react";

import { BrandLogoMarquee } from "@/components/product/BrandLogoMarquee";
import { SmartProductSearch } from "@/components/product/SmartProductSearch";
import { ProductCatalog } from "@/components/product/ProductCatalog";
import { Container } from "@/components/ui/Container";

export const metadata = {
  title: "SastaStore | Premium Digital Tools at Sasta Prices",
  description: "Explore AI tools, creative software, productivity subscriptions and digital courses at SastaStore.",
};

const highlights = [
  { icon: ShieldCheck, title: "Trusted support", text: "Friendly help before and after your order" },
  { icon: Zap, title: "Quick processing", text: "Order updates through WhatsApp" },
  { icon: BadgeCheck, title: "Clear plan details", text: "Confirm availability and terms before ordering" },
  { icon: Headphones, title: "Here to help", text: "Get assistance choosing the right plan" },
];

const categories = [
  { name: "AI Tools", detail: "AI assistants & automation", icon: "✦", href: "/categories" },
  { name: "Design & Editing", detail: "Creative apps & video tools", icon: "◈", href: "/categories" },
  { name: "Productivity", detail: "Work smarter every day", icon: "▤", href: "/categories" },
  { name: "Marketing & SEO", detail: "Grow your digital presence", icon: "↗", href: "/categories" },
];

export default function HomePage() {
  return (
    <main className="min-h-screen flex-1 overflow-hidden bg-[#f6f8f6] text-[#152a25]">
      <section className="relative overflow-hidden bg-[#0d3029] text-white">
        <div className="pointer-events-none absolute -left-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 bottom-[-10rem] h-[34rem] w-[34rem] rounded-full bg-teal-400/15 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,.22)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.22)_1px,transparent_1px)] [background-size:46px_46px]" />
        <Container>
          <div className="relative grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-[1.1fr_.9fr] lg:py-28">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200/20 bg-white/[0.07] px-4 py-2 text-[11px] font-extrabold uppercase tracking-[.2em] text-[#d7f4e6]">
                <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,.9)]" />
                Your digital marketplace
              </span>
              <h1 className="mt-7 max-w-3xl text-4xl font-black leading-[1.08] tracking-tight sm:text-6xl lg:text-[4.2rem]">
                Premium Digital Tools.
                <span className="mt-2 block text-[#f5ce78]">Sasta Prices.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-sm leading-8 text-[#c5ddd3] sm:text-base">
                Discover AI tools, creative software, productivity apps and digital subscriptions in one place. Compare available plans and get friendly support from SastaStore.
              </p>
              <div className="mt-8 max-w-2xl">
                <SmartProductSearch />
              </div>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a href="#explore-products" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#f5ce78] px-7 py-3.5 text-sm font-extrabold text-[#17372e] shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:bg-[#ffdc91]">
                  Explore Products <ArrowRight className="h-4 w-4" />
                </a>
                <Link href="/deals" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/[0.06] px-7 py-3.5 text-sm font-bold text-white transition hover:bg-white/10">
                  View Special Deals
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-xs font-semibold text-[#c5ddd3]">
                <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-emerald-300" /> Clear plan information</span>
                <span className="inline-flex items-center gap-2"><Headphones className="h-4 w-4 text-emerald-300" /> WhatsApp support</span>
                <span className="inline-flex items-center gap-2"><BadgeCheck className="h-4 w-4 text-emerald-300" /> Order assistance</span>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[470px]">
              <div className="absolute -inset-5 rounded-[2rem] bg-emerald-300/10 blur-2xl" />
              <div className="relative overflow-hidden rounded-[1.8rem] border border-white/15 bg-[#17453a] p-5 shadow-2xl shadow-black/30 sm:p-7">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-[.2em] text-[#f5ce78]">SastaStore collection</p>
                    <h2 className="mt-1 text-lg font-extrabold">Tools for your next big idea</h2>
                  </div>
                  <span className="rounded-xl bg-[#f5ce78] p-3 text-[#17372e]"><Sparkles className="h-5 w-5" /></span>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  {[
                    ["✦", "AI & Automation", "Smart digital workflows"],
                    ["◈", "Design & Video", "Create with confidence"],
                    ["▤", "Productivity", "Organise your work"],
                    ["↗", "Marketing & SEO", "Reach your audience"],
                  ].map(([symbol, title, sub]) => (
                    <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.055] p-4">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-xl text-[#f5ce78]">{symbol}</span>
                      <p className="mt-4 text-sm font-extrabold text-white">{title}</p>
                      <p className="mt-1 text-[11px] leading-5 text-[#b9d3c8]">{sub}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between rounded-xl bg-[#0d3029]/70 px-4 py-3">
                  <span className="text-xs font-semibold text-[#c5ddd3]">Explore the full collection</span>
                  <ArrowRight className="h-4 w-4 text-[#f5ce78]" />
                </div>
              </div>
              <div className="absolute -bottom-5 -left-5 hidden items-center gap-3 rounded-2xl border border-emerald-100/20 bg-white p-4 text-[#17372e] shadow-xl sm:flex">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700"><BadgeCheck className="h-5 w-5" /></span>
                <span><span className="block text-xs font-extrabold">Customer-first support</span><span className="mt-1 block text-[10px] text-slate-500">Here to help with your order</span></span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-[#e4ebe6] bg-white py-5">
        <Container>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
            {highlights.map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#edf6f0] text-[#1d6b50]"><Icon className="h-5 w-5" /></span>
                <span><span className="block text-xs font-extrabold text-[#17372e] sm:text-sm">{title}</span><span className="mt-1 block text-[10px] leading-4 text-slate-500 sm:text-xs">{text}</span></span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <BrandLogoMarquee />

      <section className="py-14 sm:py-16">
        <Container>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-[.2em] text-[#267253]">Browse by interest</p>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-[#17372e] sm:text-3xl">Explore Popular Categories</h2>
              <p className="mt-2 text-sm text-slate-500">Find the tools that fit the way you work.</p>
            </div>
            <Link href="/categories" className="inline-flex items-center gap-2 text-sm font-extrabold text-[#267253] hover:text-[#174b39]">All categories <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="mt-7 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {categories.map((item) => (
              <Link key={item.name} href={item.href} className="group rounded-2xl border border-[#e2ebe5] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-[#9bc9ad] hover:shadow-lg">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#edf6f0] text-2xl font-bold text-[#267253] transition group-hover:bg-[#dcefe2]">{item.icon}</span>
                <h3 className="mt-4 text-sm font-extrabold text-[#17372e]">{item.name}</h3>
                <p className="mt-1 text-xs text-slate-500">{item.detail}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section id="explore-products" className="scroll-mt-24 border-y border-[#e4ebe6] bg-white py-14 sm:py-20">
        <Container>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-[.2em] text-[#267253]">Featured collection</p>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-[#17372e] sm:text-3xl">Discover Your Next Favourite Tool</h2>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-500">Browse products, compare available plans and check current details before ordering.</p>
            </div>
            <Link href="/products" className="inline-flex items-center gap-2 text-sm font-extrabold text-[#267253] hover:text-[#174b39]">View all products <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <ProductCatalog />
        </Container>
      </section>

      <section className="py-14 sm:py-16">
        <Container>
          <div className="relative overflow-hidden rounded-[1.8rem] bg-[#123b32] p-7 text-white sm:p-10 lg:p-12">
            <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-emerald-300/10 blur-3xl" />
            <div className="relative flex flex-col items-start justify-between gap-7 lg:flex-row lg:items-center">
              <div className="max-w-2xl">
                <p className="text-[11px] font-extrabold uppercase tracking-[.2em] text-[#f5ce78]">SastaStore Learning Library</p>
                <h2 className="mt-3 text-2xl font-black sm:text-3xl">Build skills. Explore something new.</h2>
                <p className="mt-3 text-sm leading-7 text-[#c5ddd3]">Explore our course listings across AI, design, marketing, freelancing and more. Check course details and request access from our team.</p>
              </div>
              <Link href="/courses" className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#f5ce78] px-6 py-3.5 text-sm font-extrabold text-[#17372e] transition hover:bg-[#ffdc91]">Explore Free Courses <BookOpen className="h-4 w-4" /></Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-[#e4ebe6] bg-[#edf4ef] py-14 sm:py-16">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[11px] font-extrabold uppercase tracking-[.2em] text-[#267253]">Simple and clear</p>
            <h2 className="mt-3 text-2xl font-black text-[#17372e] sm:text-3xl">How SastaStore Works</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">A straightforward way to explore digital products and get help with your order.</p>
          </div>
          <div className="mt-9 grid gap-4 sm:grid-cols-3">
            {[
              ["01", "Choose a product", "Browse the catalogue and compare the plans available."],
              ["02", "Confirm your order", "Contact our team to confirm price, availability and terms."],
              ["03", "Get order support", "Receive updates and assistance with your digital order."],
            ].map(([number, title, description]) => (
              <div key={number} className="rounded-2xl border border-[#dce8df] bg-white p-6 shadow-sm">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#123b32] text-sm font-black text-[#f5ce78]">{number}</span>
                <h3 className="mt-4 text-base font-extrabold text-[#17372e]">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}

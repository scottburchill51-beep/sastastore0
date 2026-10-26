
import Link from "next/link";

import { ProductCatalog } from "@/components/product/ProductCatalog";
import { Container } from "@/components/ui/Container";

export const metadata = {
  title: "SastaStore | Your Digital World, Upgraded",
  description:
    "Discover premium digital subscriptions, AI tools and software at affordable prices in Pakistan.",
};

const categories = [
  {
    icon: "✦",
    title: "AI & Automation",
    description: "Smarter tools for everyday work.",
    style: "bg-blue-50 border-blue-100",
    iconStyle: "bg-blue-100 text-blue-700",
  },
  {
    icon: "◈",
    title: "Creative Tools",
    description: "Design, edit and create with ease.",
    style: "bg-emerald-50 border-emerald-100",
    iconStyle: "bg-emerald-100 text-emerald-700",
  },
  {
    icon: "◎",
    title: "Entertainment",
    description: "Premium digital experiences.",
    style: "bg-orange-50 border-orange-100",
    iconStyle: "bg-orange-100 text-orange-700",
  },
  {
    icon: "⌘",
    title: "Productivity",
    description: "Work faster and stay organised.",
    style: "bg-sky-50 border-sky-100",
    iconStyle: "bg-sky-100 text-sky-700",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen flex-1 overflow-hidden bg-[#F8FAFC] text-slate-900">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-[#F0F8FF] to-[#E5F4FF]">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-200/40 blur-3xl" />

        <div className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-emerald-200/40 blur-3xl" />

        <Container>
          <div className="relative mx-auto max-w-5xl pb-20 pt-24 text-center sm:pt-32">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-5 py-2 text-xs font-bold tracking-wide text-blue-700 shadow-sm">
              ✦ YOUR PREMIUM DIGITAL MARKETPLACE
            </span>

            <h1 className="mt-8 text-5xl font-black leading-[1.1] tracking-tight text-slate-900 sm:text-7xl">
              Everything Digital.
              <span className="mt-3 block bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                One Smart Store.
              </span>
            </h1>

            <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              Explore premium AI tools, creative apps,
              productivity software and digital
              subscriptions at prices that make sense.
            </p>

            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="#explore-products"
                className="inline-flex min-h-14 items-center justify-center rounded-2xl bg-blue-600 px-9 text-sm font-bold text-white shadow-lg shadow-blue-200 transition duration-300 hover:-translate-y-1 hover:bg-blue-700"
              >
                Explore Products ↗
              </Link>

              <Link
                href="#how-it-works"
                className="inline-flex min-h-14 items-center justify-center rounded-2xl border border-slate-200 bg-white px-9 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700"
              >
                How It Works ↓
              </Link>
            </div>

            {/* LIGHT VISUAL SHOWCASE */}
            <div className="relative mx-auto mt-20 max-w-4xl">
              <div className="rounded-[30px] border border-blue-100 bg-white/90 p-4 shadow-[0_25px_80px_rgba(30,64,175,0.10)] backdrop-blur sm:p-7">
                <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                  <div className="flex gap-2">
                    <span className="h-3 w-3 rounded-full bg-red-300" />
                    <span className="h-3 w-3 rounded-full bg-amber-300" />
                    <span className="h-3 w-3 rounded-full bg-green-300" />
                  </div>

                  <p className="text-xs font-bold tracking-widest text-slate-400">
                    SASTASTORE
                  </p>

                  <span className="text-blue-500">✦</span>
                </div>

                <div className="grid gap-4 py-6 sm:grid-cols-3">
                  <div className="flex min-h-48 flex-col justify-between rounded-2xl bg-gradient-to-br from-blue-50 to-sky-100 p-6 text-left">
                    <span className="text-5xl text-blue-600">✦</span>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">
                        AI Tools
                      </h3>
                      <p className="mt-2 text-sm text-slate-600">
                        Work smarter every day.
                      </p>
                    </div>
                  </div>

                  <div className="flex min-h-48 flex-col justify-between rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-100 p-6 text-left">
                    <span className="text-5xl text-emerald-600">◈</span>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">
                        Creative Apps
                      </h3>
                      <p className="mt-2 text-sm text-slate-600">
                        Create something amazing.
                      </p>
                    </div>
                  </div>

                  <div className="flex min-h-48 flex-col justify-between rounded-2xl bg-gradient-to-br from-orange-50 to-amber-100 p-6 text-left">
                    <span className="text-5xl text-orange-600">◎</span>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">
                        Subscriptions
                      </h3>
                      <p className="mt-2 text-sm text-slate-600">
                        More digital possibilities.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* BENEFITS */}
      <section className="border-y border-slate-100 bg-white py-12">
        <Container>
          <div className="grid gap-8 text-center md:grid-cols-3">
            {[
              ["✦", "Curated Digital Products", "Find the tools you need in one place."],
              ["◇", "Affordable Plans", "Compare options that fit your budget."],
              ["♡", "Friendly Support", "Get help choosing the right product."],
            ].map(([icon, title, description]) => (
              <div key={title}>
                <p className="mb-3 text-3xl text-blue-600">
                  {icon}
                </p>
                <h3 className="font-bold text-slate-900">
                  {title}
                </h3>
                <p className="mt-2 text-sm text-slate-500">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CATEGORIES */}
      <section className="bg-[#F8FAFC] py-24">
        <Container>
          <div className="mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-blue-600">
              Explore Categories
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Find what inspires you.
            </h2>

            <p className="mt-4 text-slate-500">
              Explore our range of digital tools and subscriptions.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <Link
                key={category.title}
                href="/products"
                className={`group flex min-h-[250px] flex-col justify-between rounded-3xl border p-7 transition duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-100/60 ${category.style}`}
              >
                <span
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl text-3xl ${category.iconStyle}`}
                >
                  {category.icon}
                </span>

                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {category.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {category.description}
                  </p>

                  <span className="mt-5 inline-block text-sm font-bold text-blue-600 transition group-hover:translate-x-1">
                    Explore →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* PRODUCTS */}
      <section
        id="explore-products"
        className="scroll-mt-20 bg-white py-24"
      >
        <Container>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-blue-600">
            Digital Collection
          </p>

          <h2 className="mt-4 text-3xl font-bold text-slate-900 sm:text-5xl">
            Discover your next favourite tool.
          </h2>

          <p className="mt-4 max-w-2xl text-slate-500">
            Search and compare products to find the perfect plan.
          </p>

          <div className="mt-10 rounded-3xl bg-[#08090c] p-4 sm:p-6">
            <ProductCatalog />
          </div>
        </Container>
      </section>

      {/* HOW IT WORKS */}
      <section
        id="how-it-works"
        className="scroll-mt-20 bg-[#EFF7FF] py-24"
      >
        <Container>
          <div className="mb-14 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-blue-600">
              How It Works
            </p>

            <h2 className="mt-4 text-3xl font-bold text-slate-900 sm:text-5xl">
              Simple from start to finish.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                number: "01",
                title: "Explore Products",
                text: "Browse products and compare available plans.",
              },
              {
                number: "02",
                title: "Choose Your Plan",
                text: "Select a plan and sign in to start ordering.",
              },
              {
                number: "03",
                title: "Receive Your Product",
                text: "Your digital purchase is fulfilled after payment approval.",
              },
            ].map((item) => (
              <div
                key={item.number}
                className="rounded-3xl border border-blue-100 bg-white p-8 shadow-sm"
              >
                <span className="text-4xl font-black text-blue-200">
                  {item.number}
                </span>

                <h3 className="mt-7 text-xl font-bold text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-500">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* FINAL CTA */}
      <section className="bg-white py-24">
        <Container>
          <div className="rounded-[32px] border border-blue-100 bg-gradient-to-r from-[#E8F3FF] to-[#DFFAF1] px-7 py-20 text-center sm:px-12">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-blue-700">
              SastaStore 2.0
            </p>

            <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-black tracking-tight text-slate-900 sm:text-5xl">
              Your next digital upgrade starts here.
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-slate-600">
              Better tools, simple choices and affordable plans.
            </p>

            <Link
              href="/products"
              className="mt-9 inline-flex min-h-14 items-center justify-center rounded-2xl bg-blue-600 px-9 text-sm font-bold text-white transition hover:bg-blue-700"
            >
              Browse All Products →
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}

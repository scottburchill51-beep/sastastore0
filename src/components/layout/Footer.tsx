import Link from "next/link";
import { ArrowUpRight, Globe, MessageCircle, Send, ShieldCheck, Sparkles } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import { createWhatsAppUrl } from "@/lib/whatsapp";

const shopLinks = [
  { label: "All Products", href: "/products" },
  { label: "Browse Categories", href: "/categories" },
  { label: "Special Deals", href: "/deals" },
  { label: "Free Course Library", href: "/courses" },
  { label: "Our Services", href: "/services" },
];
const helpLinks = [
  { label: "Track an Order", href: "/track" },
  { label: "My Account", href: "/account" },
  { label: "Frequently Asked Questions", href: "/faq" },
  { label: "Contact Support", href: "/contact" },
  { label: "Refund Policy", href: "/refund-policy" },
];
const companyLinks = [
  { label: "About SastaStore", href: "/about" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
];

const whatsappChannelUrl = "https://whatsapp.com/channel/0029Vb7BXu2B4hdMiWIlwY1v";
const telegramUrl = "https://t.me/Techboyy0";
const facebookUrl = "https://www.facebook.com/share/1cbKHVxxJi/";

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="text-[11px] font-black uppercase tracking-[.18em] text-[#e8c875]">{title}</h3>
      <ul className="mt-5 space-y-3">
        {links.map((link) => <li key={link.href}><Link href={link.href} className="group inline-flex items-center gap-1.5 text-sm text-[#c1cec4] transition hover:translate-x-1 hover:text-white">{link.label}<ArrowUpRight className="h-3 w-3 opacity-0 transition group-hover:opacity-100" /></Link></li>)}
      </ul>
    </div>
  );
}

export function Footer() {
  const whatsappUrl = createWhatsAppUrl("Hello SastaStore, I need help with a product or order.");
  return (
    <footer className="mt-auto overflow-hidden bg-[#101a16] text-white">
      <div className="border-b border-white/10 bg-[#17251e]">
        <Container>
          <div className="flex flex-col items-center justify-between gap-4 py-6 text-center sm:flex-row sm:text-left">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e8c875] text-[#18251c]"><Sparkles className="h-5 w-5" /></span>
              <div><p className="text-sm font-extrabold">Need help choosing a digital product?</p><p className="mt-1 text-xs text-[#b9c9bd]">Our team can help you check plans and availability.</p></div>
            </div>
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-[#e8c875] px-5 py-3 text-xs font-black text-[#18251c] transition hover:-translate-y-0.5 hover:bg-[#f4d994]"><MessageCircle className="h-4 w-4" /> Chat on WhatsApp</a>
          </div>
        </Container>
      </div>

      <div className="border-b border-white/[.08] bg-[#0c1511] py-3">
        <div className="sastastore-footer-marquee flex w-max items-center gap-8 whitespace-nowrap text-[10px] font-extrabold uppercase tracking-[.18em] text-[#b8c8bc]">
          {[0, 1].map((copy) => <div key={copy} aria-hidden={copy === 1} className="flex items-center gap-8 pr-8"><span>AI tools</span><span className="text-[#e8c875]">✦</span><span>Creative software</span><span className="text-[#e8c875]">✦</span><span>Digital subscriptions</span><span className="text-[#e8c875]">✦</span><span>Productivity apps</span><span className="text-[#e8c875]">✦</span><span>Learning resources</span><span className="text-[#e8c875]">✦</span></div>)}
        </div>
      </div>

      <Container>
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.45fr_1fr_1fr_1fr] lg:gap-12 lg:py-16">
          <div>
            <Link href="/" className="inline-flex items-center gap-3" aria-label="SastaStore homepage">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8c875] text-xl font-black text-[#18251c]">S</span>
              <span className="text-2xl font-black tracking-tight">Sasta<span className="text-[#e8c875]">Store</span></span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-7 text-[#b9c9bd]">Premium digital tools at Sasta prices. Explore software, AI tools and subscriptions for your everyday work.</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <a href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="WhatsApp support" className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[.05] text-[#d9e4db] transition hover:border-[#e8c875]/50 hover:bg-[#e8c875] hover:text-[#17251e]"><MessageCircle className="h-4 w-4" /></a>
              <a href={telegramUrl} target="_blank" rel="noreferrer" aria-label="Telegram" className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[.05] text-[#d9e4db] transition hover:border-[#e8c875]/50 hover:bg-[#e8c875] hover:text-[#17251e]"><Send className="h-4 w-4" /></a>
              <a href={facebookUrl} target="_blank" rel="noreferrer" aria-label="Facebook" className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[.05] text-[#d9e4db] transition hover:border-[#e8c875]/50 hover:bg-[#e8c875] hover:text-[#17251e]"><Globe className="h-4 w-4" /></a>
            </div>
            <p className="mt-5 text-xs text-[#93a69a]">WhatsApp: <a className="font-bold text-[#e8c875] hover:text-white" href={whatsappUrl} target="_blank" rel="noreferrer">{siteConfig.whatsapp.display}</a></p>
          </div>
          <FooterColumn title="Explore" links={shopLinks} />
          <FooterColumn title="Customer Care" links={helpLinks} />
          <div>
            <FooterColumn title="Company" links={companyLinks} />
            <div className="mt-8 rounded-xl border border-white/10 bg-white/[.04] p-4">
              <div className="flex items-center gap-2 text-xs font-extrabold text-white"><ShieldCheck className="h-4 w-4 text-[#e8c875]" /> Shop with clarity</div>
              <p className="mt-2 text-xs leading-5 text-[#aebeb2]">Check the product details, plan duration and terms with our team before confirming an order.</p>
            </div>
          </div>
        </div>
      </Container>

      <div className="border-t border-white/[.09] bg-[#0a120e]">
        <Container>
          <div className="flex flex-col items-center justify-between gap-3 py-5 text-center sm:flex-row sm:text-left">
            <p className="text-[11px] text-[#93a69a]">© {new Date().getFullYear()} SastaStore. All rights reserved.</p>
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] font-semibold text-[#b9c9bd]">
              <a href={whatsappChannelUrl} target="_blank" rel="noreferrer" className="hover:text-[#e8c875]">WhatsApp Channel</a>
              <Link href="/privacy" className="hover:text-[#e8c875]">Privacy</Link>
              <Link href="/terms" className="hover:text-[#e8c875]">Terms</Link>
              <Link href="/refund-policy" className="hover:text-[#e8c875]">Refunds</Link>
            </div>
          </div>
        </Container>
      </div>
      <style>{`
        @keyframes sastastore-footer-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .sastastore-footer-marquee { animation: sastastore-footer-marquee 34s linear infinite; }
        .sastastore-footer-marquee:hover { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) { .sastastore-footer-marquee { animation: none; } }
      `}</style>
    </footer>
  );
}

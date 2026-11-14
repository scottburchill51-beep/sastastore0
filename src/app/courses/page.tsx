import type { Metadata } from "next";
import { BookOpen, ShieldCheck, MessageCircle } from "lucide-react";

import { CourseCatalog } from "@/components/course/CourseCatalog";
import { courses } from "@/data/courses";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Courses Library | SastaStore",
  description:
    "Explore courses covering AI tools, YouTube, e-commerce, freelancing, digital marketing, design, web development and productivity.",
  alternates: {
    canonical: "/courses",
  },
};

const benefits = [
  {
    icon: BookOpen,
    title: "Explore learning topics",
    description: "Browse practical topics across AI, creativity, marketing and technology.",
  },
  {
    icon: ShieldCheck,
    title: "Clear course enquiries",
    description: "Ask our team for current availability and course details before proceeding.",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp support",
    description: "Send a course enquiry directly to the SastaStore support team.",
  },
];

export default function CoursesPage() {
  return (
    <main className="min-h-screen flex-1 overflow-hidden bg-[#f6f8f6] text-[#17372e]">
      <section className="relative overflow-hidden border-b border-[#e0e9e2]">
        <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-emerald-100 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 top-10 h-80 w-80 rounded-full bg-amber-100/50 blur-3xl" />
        <Container>
          <div className="relative mx-auto max-w-4xl py-16 text-center sm:py-24">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#dce8df] bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#267253]">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              SastaStore Learning Library
            </span>
            <h1 className="mt-7 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              Learn Something
              <span className="mt-2 block bg-gradient-to-r from-[#123b32] via-[#267253] to-[#b38a42] bg-clip-text text-transparent">
                New Today
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
              Explore courses covering AI, content creation, e-commerce,
              freelancing, marketing, design and more. Search the library
              and contact our team for current course details.
            </p>
            <a
              href="#course-library"
              className="mt-8 inline-flex items-center justify-center rounded-xl bg-[#123b32] px-6 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-emerald-950/30 transition hover:bg-[#1c5746] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
            >
              Explore Courses
            </a>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-xs font-medium text-slate-500">
              <span>AI & Technology</span>
              <span className="text-emerald-500">•</span>
              <span>Creative Skills</span>
              <span className="text-emerald-500">•</span>
              <span>Business & Marketing</span>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-[#e0e9e2] bg-[#edf4ef] py-8 sm:py-10">
        <Container>
          <div className="grid gap-4 md:grid-cols-3">
            {benefits.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex gap-4 rounded-2xl border border-[#dce8df] bg-white p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#dce8df] bg-[#edf6f0] text-[#267253]">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-[#17372e]">{title}</h2>
                  <p className="mt-2 text-xs leading-6 text-slate-500">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section id="course-library" className="scroll-mt-24 py-14 sm:py-20">
        <Container>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">
                Browse the collection
              </p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Course Library
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
                Find a topic that interests you. Course availability, access
                method and any applicable charges are confirmed by our team.
              </p>
            </div>
            <span className="w-fit rounded-full border border-[#e0e9e2] bg-white px-3 py-1.5 text-xs font-semibold text-slate-600">
              {courses.length} listings
            </span>
          </div>
          <CourseCatalog />
        </Container>
      </section>

      <section className="border-t border-[#e0e9e2] bg-[#edf4ef] py-14">
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-emerald-400/15 bg-gradient-to-br from-[#e8f3eb] to-[#f7f3e8] p-7 sm:flex-row sm:items-center sm:p-10">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#267253]">
                Need help choosing?
              </p>
              <h2 className="mt-3 text-2xl font-extrabold text-[#17372e]">
                Talk to the SastaStore team
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-7 text-slate-500">
                Contact us to confirm the latest course information and
                availability before placing an order.
              </p>
            </div>
            <a
              href="https://wa.me/923136093501?text=Hi%20SastaStore%2C%20I%20need%20help%20with%20the%20courses%20library."
              target="_blank"
              rel="noreferrer"
              className="shrink-0 rounded-xl bg-[#123b32] px-6 py-3.5 text-sm font-extrabold text-white transition hover:bg-[#1c5746] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
            >
              Contact on WhatsApp
            </a>
          </div>
        </Container>
      </section>
    </main>
  );
}

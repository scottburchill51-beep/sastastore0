import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, BookOpen, CheckCircle2, Gift } from "lucide-react";

import { courses } from "@/data/courses";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = courses.find((item) => item.slug === slug);
  if (!course) {
    return {
      title: "Course not found | SastaStore",
      robots: { index: false, follow: false },
    };
  }

  const url = `${siteConfig.url}/courses/${course.slug}`;
  const description = course.description;

  return {
    title: `${course.title} | SastaStore`,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      siteName: siteConfig.name,
      title: course.title,
      description,
      images: [{ url: course.imageUrl, alt: course.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: course.title,
      description,
      images: [course.imageUrl],
    },
  };
}

export default async function CourseDetailsPage({ params }: Props) {
  const { slug } = await params;
  const course = courses.find((item) => item.slug === slug);
  if (!course) notFound();

  const message = encodeURIComponent(`Hi SastaStore, I would like to ask about access to: ${course.title}`);
  const accessUrl = `https://wa.me/${siteConfig.whatsapp.number}?text=${message}`;

  return (
    <main className="min-h-screen bg-[#08090c] py-10 text-white sm:py-16">
      <Container>
        <Link href="/courses" className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-400 transition hover:text-emerald-300"><ArrowLeft className="h-4 w-4" /> Back to courses</Link>
        <div className="mt-7 grid overflow-hidden rounded-3xl border border-white/10 bg-[#111318] lg:grid-cols-2">
          <div className="relative min-h-[260px] lg:min-h-[480px]">
            <Image src={course.imageUrl} alt={course.title} fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111318] via-black/15 to-transparent lg:bg-gradient-to-r" />
            <span className="absolute left-6 top-6 rounded-full border border-white/20 bg-black/50 px-4 py-2 text-xs font-bold text-white backdrop-blur">{course.category}</span>
          </div>
          <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-400/10 px-3 py-2 text-xs font-extrabold uppercase tracking-wider text-emerald-300"><Gift className="h-4 w-4" /> Course listing</span>
            <h1 className="mt-6 text-3xl font-black leading-tight sm:text-4xl">{course.title}</h1>
            <p className="mt-5 text-sm leading-7 text-zinc-400">{course.description}</p>
            <div className="mt-7 space-y-3">
              <p className="flex items-center gap-3 text-sm text-zinc-300"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> Ask our team for access details</p>
              <p className="flex items-center gap-3 text-sm text-zinc-300"><BookOpen className="h-4 w-4 text-emerald-400" /> Course access is handled through SastaStore support</p>
            </div>
            <a href={accessUrl} target="_blank" rel="noreferrer" className="mt-9 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-400 px-6 py-4 text-sm font-extrabold text-[#07110a] transition hover:bg-emerald-300">Ask About Course Access <ArrowUpRight className="h-4 w-4" /></a>
            <p className="mt-4 text-xs leading-6 text-zinc-500">This opens WhatsApp with the course name included in your message.</p>
          </div>
        </div>
      </Container>
    </main>
  );
}

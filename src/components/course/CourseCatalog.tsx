"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Search, Sparkles } from "lucide-react";

import { courses, courseCategories } from "@/data/courses";

export function CourseCatalog() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All Courses");

  const filteredCourses = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return courses.filter((course) => {
      const matchesCategory = category === "All Courses" || course.category === category;
      const matchesQuery = !normalizedQuery || `${course.title} ${course.category} ${course.description}`.toLowerCase().includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  return (
    <div className="mt-9">
      <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#111318] p-4 sm:flex-row sm:items-center">
        <label className="relative block flex-1">
          <Search aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search courses or topics..." className="w-full rounded-xl border border-white/10 bg-[#090b0f] py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-emerald-500/60" />
        </label>
        <p className="text-sm text-zinc-400"><span className="font-semibold text-white">{filteredCourses.length}</span> {filteredCourses.length === 1 ? "course" : "courses"} found</p>
      </div>

      <div className="mt-5 flex gap-2 overflow-x-auto pb-2" aria-label="Filter courses by category">
        {courseCategories.map((item) => {
          const active = category === item;
          return <button key={item} type="button" onClick={() => setCategory(item)} aria-pressed={active} className={`shrink-0 rounded-full border px-4 py-2 text-xs font-semibold transition ${active ? "border-emerald-400 bg-emerald-400 text-[#07110a]" : "border-white/10 bg-[#111318] text-zinc-300 hover:border-emerald-500/40 hover:text-white"}`}>{item}</button>;
        })}
      </div>

      {filteredCourses.length > 0 ? (
        <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filteredCourses.map((course, index) => {
            const message = encodeURIComponent(`Hi SastaStore, I would like to ask about access to: ${course.title}`);
            const accessUrl = `https://wa.me/923136093501?text=${message}`;
            return (
              <article key={course.slug} className="group flex min-h-[390px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#111318] transition duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-[0_18px_55px_rgba(0,0,0,0.28)]">
                <Link href={`/courses/${course.slug}`} className="relative block h-44 overflow-hidden" aria-label={`View ${course.title}`}>
                  <Image src={course.imageUrl} alt={course.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw" className="object-cover transition duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090b0f] via-black/10 to-black/10" />
                  <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/55 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur">{course.category}</span>
                  <span className="absolute right-4 top-4 rounded-full bg-emerald-400 px-3 py-1.5 text-[11px] font-extrabold text-[#07110a]">COURSE</span>
                  <span className="absolute bottom-3 right-4 text-5xl font-black text-white/40">{String(index + 1).padStart(2, "0")}</span>
                </Link>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-emerald-400">SastaStore Learning Library</p>
                  <h2 className="mt-3 text-base font-bold leading-6 text-white">{course.title}</h2>
                  <p className="mt-3 flex-1 text-sm leading-6 text-zinc-400">{course.description}</p>
                  <a href={accessUrl} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center justify-between rounded-xl bg-emerald-400 px-4 py-3 text-sm font-extrabold text-[#07110a] transition hover:bg-emerald-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300">
                    Ask About Course Access <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="mt-5 rounded-2xl border border-dashed border-white/15 bg-[#111318] px-6 py-16 text-center">
          <Sparkles className="mx-auto h-8 w-8 text-emerald-400" aria-hidden="true" />
          <h2 className="mt-4 text-lg font-bold text-white">No matching courses</h2>
          <p className="mt-2 text-sm text-zinc-400">Try another keyword or choose a different category.</p>
          <button type="button" onClick={() => { setQuery(""); setCategory("All Courses"); }} className="mt-5 rounded-xl bg-emerald-400 px-4 py-2.5 text-sm font-bold text-[#07110a] transition hover:bg-emerald-300">Clear filters</button>
        </div>
      )}
    </div>
  );
}

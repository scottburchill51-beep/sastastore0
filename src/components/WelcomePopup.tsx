
"use client";

import { useEffect, useState } from "react";

export default function WelcomePopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem("sastastore_welcome_seen")) {
      setOpen(true);
    }
  }, []);

  function closePopup() {
    sessionStorage.setItem("sastastore_welcome_seen", "yes");
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/75 p-4">
      <div className="relative max-h-[85vh] w-full max-w-[740px] overflow-y-auto rounded-3xl border border-emerald-900/50 bg-[#0e1117] p-7 text-center text-white shadow-2xl sm:p-12">

        <button
          type="button"
          onClick={closePopup}
          aria-label="Close welcome popup"
          className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black text-3xl text-white hover:bg-slate-900"
        >
          ×
        </button>

        <div className="mx-auto mb-7 flex h-28 w-28 items-center justify-center rounded-3xl border border-emerald-900 bg-[#11151c] text-7xl font-bold text-green-500">
          S
        </div>

        <div className="mx-auto mb-5 w-fit rounded-full border border-green-900 bg-green-950/40 px-5 py-2 text-sm font-bold tracking-[0.2em] text-green-500">
          ● WELCOME
        </div>

        <h2 className="mb-7 text-3xl font-extrabold tracking-tight sm:text-5xl">
          Welcome to{" "}
          <span className="text-green-500">SastaStore</span>
        </h2>

        <p className="mb-9 text-lg leading-relaxed text-slate-400">
          Your destination for affordable digital tools,
          AI subscriptions, premium apps and professional
          digital services.
        </p>

        <div className="mb-9 grid grid-cols-2 gap-4">
          {[
            "AI & Premium Tools",
            "Digital Services",
            "Fast Delivery",
            "WhatsApp Support",
          ].map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-5 text-sm text-slate-300 sm:text-base"
            >
              {item}
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-green-900 bg-green-950/30 p-6">
          <h3 className="mb-3 text-lg font-bold">
            Follow our WhatsApp Channel
          </h3>

          <p className="mb-5 text-sm text-slate-400">
            Get updates on digital tools, new products
            and special offers.
          </p>

          <button
            type="button"
            onClick={closePopup}
            className="rounded-xl bg-green-600 px-7 py-3 font-semibold text-white transition hover:bg-green-700"
          >
            Continue to SastaStore
          </button>
        </div>
      </div>
    </div>
  );
}

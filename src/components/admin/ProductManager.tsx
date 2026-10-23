
"use client";

import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import type { Product } from "@/types/product";

const blank: Product = {
  name: "",
  slug: "",
  category: "ai-tools",
  shortDescription: "",
  description: "",
  logo: "",
  coverImage: "",
  plans: [],
  features: [],
  availability: "available",
  seo: { title: "", description: "" },
};

async function uploadProductImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("/api/admin/upload-image", {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  if (!response.ok || !data.url) {
    throw new Error(data.error || "Image upload failed");
  }

  return data.url;
}

export function ProductManager() {
  const [list, setList] = useState<Product[]>([]);
  const [form, setForm] = useState<Product>({ ...blank });
  const [plans, setPlans] = useState("[]");
  const [features, setFeatures] = useState("");
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState<
    "logo" | "coverImage" | null
  >(null);
  const [saving, setSaving] = useState(false);

  async function load() {
    try {
      const response = await fetch("/api/admin/products", {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Unable to load products.");
      }

      const rows: { payload: Product }[] =
        await response.json();

      setList(rows.map((row) => row.payload));
    } catch {
      setMessage(
        "Unable to load products. Check database and admin access."
      );
    }
  }

  useEffect(() => {
    void load();
  }, []);

  function edit(product: Product) {
    setForm({
      ...product,
      seo: { ...product.seo },
    });
    setPlans(JSON.stringify(product.plans, null, 2));
    setFeatures(product.features.join("\n"));
    setMessage("");
  }

  async function handleImageUpload(
    event: ChangeEvent<HTMLInputElement>,
    key: "logo" | "coverImage"
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    const allowed = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowed.includes(file.type)) {
      setMessage("Only JPG, PNG and WebP images are allowed.");
      event.target.value = "";
      return;
    }

    if (file.size === 0 || file.size > 5 * 1024 * 1024) {
      setMessage("Image must be between 1 byte and 5 MB.");
      event.target.value = "";
      return;
    }

    setUploading(key);
    setMessage("");

    try {
      const url = await uploadProductImage(file);

      setForm((previous) => ({
        ...previous,
        [key]: url,
      }));

      setMessage(
        "Image uploaded successfully. Click Save product to save it with this product."
      );
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Image upload failed."
      );
    } finally {
      setUploading(null);
      event.target.value = "";
    }
  }

  async function save() {
    if (uploading || saving) return;

    setMessage("");

    let parsed: Product["plans"];

    try {
      parsed = JSON.parse(plans);

      if (!Array.isArray(parsed)) {
        throw new Error();
      }
    } catch {
      setMessage("Plans must be a JSON array.");
      return;
    }

    const payload: Product = {
      ...form,
      plans: parsed,
      features: features
        .split("\n")
        .map((value) => value.trim())
        .filter(Boolean),
    };

    setSaving(true);

    try {
      const response = await fetch("/api/admin/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to save product.");
      }

      setMessage("Product saved successfully.");
      await load();
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Failed to save product."
      );
    } finally {
      setSaving(false);
    }
  }

  async function remove(slug: string) {
    if (!confirm(`Delete ${slug}?`)) return;

    try {
      const response = await fetch(
        `/api/admin/products?slug=${encodeURIComponent(slug)}`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        throw new Error("Delete failed.");
      }

      setMessage("Product deleted successfully.");
      await load();
    } catch {
      setMessage("Delete failed.");
    }
  }

  const field = (key: keyof Product, label: string) => (
    <label className="mb-4 block text-sm font-medium text-slate-700">
      {label}
      <input
        className="mt-2 block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-violet-500"
        value={String(form[key] ?? "")}
        onChange={(event) =>
          setForm((previous) => ({
            ...previous,
            [key]: event.target.value,
          }))
        }
      />
    </label>
  );

  function imageField(
    key: "logo" | "coverImage",
    title: string
  ) {
    const value = form[key];

    return (
      <div className="mb-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <h3 className="mb-3 font-semibold text-slate-900">
          {title}
        </h3>

        {value ? (
          <div className="mb-4 flex min-h-28 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white p-3">
            <img
              src={value}
              alt={`${form.name || "Product"} ${title}`}
              className="max-h-44 max-w-full object-contain"
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />
          </div>
        ) : (
          <div className="mb-4 flex h-28 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white text-sm text-slate-400">
            No image selected
          </div>
        )}

        <label className="block text-sm font-medium text-slate-700">
          Upload from computer
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            disabled={uploading !== null || saving}
            onChange={(event) =>
              void handleImageUpload(event, key)
            }
            className="mt-2 block w-full cursor-pointer rounded-xl border border-slate-200 bg-white p-3 text-sm disabled:opacity-50"
          />
        </label>

        {uploading === key && (
          <p className="mt-3 text-sm font-medium text-violet-600">
            Uploading image...
          </p>
        )}

        <label className="mt-4 block text-sm font-medium text-slate-700">
          Or enter an existing image path / URL
          <input
            type="text"
            value={value || ""}
            onChange={(event) =>
              setForm((previous) => ({
                ...previous,
                [key]: event.target.value,
              }))
            }
            className="mt-2 block w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm"
            placeholder="/products/example.webp"
          />
        </label>

        {value && (
          <button
            type="button"
            onClick={() =>
              setForm((previous) => ({
                ...previous,
                [key]: "",
              }))
            }
            className="mt-3 text-sm font-semibold text-rose-600 hover:underline"
          >
            Remove image from product
          </button>
        )}

        <p className="mt-3 text-xs text-slate-500">
          JPG, PNG or WebP. Maximum 5 MB.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-bold text-slate-900">
            Product Catalogue ({list.length})
          </h2>

          <button
            type="button"
            onClick={() => edit({ ...blank })}
            className="rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-violet-700"
          >
            + New Product
          </button>
        </div>

        <div className="max-h-[750px] space-y-3 overflow-y-auto pr-1">
          {list.map((product) => (
            <div
              key={product.slug}
              className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4"
            >
              <div className="min-w-0">
                <p className="font-semibold text-slate-900">
                  {product.name}
                </p>

                <p className="mt-1 break-all text-xs text-slate-500">
                  {product.slug} · {product.plans.length} plans
                </p>
              </div>

              <div className="flex shrink-0 gap-3">
                <button
                  type="button"
                  onClick={() => edit(product)}
                  className="text-sm font-semibold text-violet-600 hover:underline"
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => void remove(product.slug)}
                  className="text-sm font-semibold text-rose-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
        <h2 className="mb-6 text-xl font-bold text-slate-900">
          Product Details
        </h2>

        {field("name", "Product name")}
        {field("slug", "URL slug (lowercase-hyphens)")}
        {field("category", "Category slug")}
        {field("shortDescription", "Short description")}
        {field("description", "Full description")}

        {imageField("logo", "Product Logo")}
        {imageField("coverImage", "Product Cover Image")}

        {field("badge", "Badge")}
        {field("deliveryInfo", "Delivery instructions")}
        {field("whatsappMessage", "WhatsApp order message")}

        <label className="mb-4 block text-sm font-medium text-slate-700">
          Availability
          <select
            value={form.availability}
            onChange={(event) =>
              setForm((previous) => ({
                ...previous,
                availability:
                  event.target.value as Product["availability"],
              }))
            }
            className="mt-2 block w-full rounded-xl border border-slate-200 bg-white p-3"
          >
            <option value="available">Available</option>
            <option value="limited">Limited</option>
            <option value="out-of-stock">Out of stock</option>
          </select>
        </label>

        <div className="my-5 flex flex-wrap gap-4">
          {(["featured", "popular", "new"] as const).map(
            (key) => (
              <label
                key={key}
                className="flex items-center gap-2 text-sm capitalize"
              >
                <input
                  type="checkbox"
                  checked={!!form[key]}
                  onChange={(event) =>
                    setForm((previous) => ({
                      ...previous,
                      [key]: event.target.checked,
                    }))
                  }
                />
                {key}
              </label>
            )
          )}
        </div>

        <label className="my-4 block text-sm font-medium text-slate-700">
          Plans (JSON array with id, name, duration, price)
          <textarea
            rows={7}
            value={plans}
            onChange={(event) => setPlans(event.target.value)}
            className="mt-2 block w-full rounded-xl border border-slate-200 bg-white p-3 font-mono text-sm"
          />
        </label>

        <label className="my-4 block text-sm font-medium text-slate-700">
          Features (one per line)
          <textarea
            rows={4}
            value={features}
            onChange={(event) => setFeatures(event.target.value)}
            className="mt-2 block w-full rounded-xl border border-slate-200 bg-white p-3"
          />
        </label>

        <label className="my-4 block text-sm font-medium text-slate-700">
          SEO title
          <input
            value={form.seo.title}
            onChange={(event) =>
              setForm((previous) => ({
                ...previous,
                seo: {
                  ...previous.seo,
                  title: event.target.value,
                },
              }))
            }
            className="mt-2 block w-full rounded-xl border border-slate-200 bg-white p-3"
          />
        </label>

        <label className="my-4 block text-sm font-medium text-slate-700">
          SEO description
          <input
            value={form.seo.description}
            onChange={(event) =>
              setForm((previous) => ({
                ...previous,
                seo: {
                  ...previous.seo,
                  description: event.target.value,
                },
              }))
            }
            className="mt-2 block w-full rounded-xl border border-slate-200 bg-white p-3"
          />
        </label>

        {message && (
          <p
            role="status"
            className="my-4 rounded-xl bg-violet-50 p-4 text-sm text-violet-800"
          >
            {message}
          </p>
        )}

        <button
          type="button"
          disabled={uploading !== null || saving}
          onClick={() => void save()}
          className="w-full rounded-xl bg-violet-600 px-6 py-3.5 font-semibold text-white hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Product"}
        </button>
      </section>
    </div>
  );
}

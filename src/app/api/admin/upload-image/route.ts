
import { randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { getSession, isAdmin } from "@/lib/store-backend";

export const runtime = "nodejs";

const allowedTypes: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

export async function POST(request: NextRequest) {
  const { user, token } = await getSession();

  if (!user || !token) {
    return NextResponse.json(
      { error: "Please sign in first" },
      { status: 401 }
    );
  }

  if (!(await isAdmin(user.id, token))) {
    return NextResponse.json(
      { error: "Admin access required" },
      { status: 403 }
    );
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !anonKey) {
    return NextResponse.json(
      { error: "Supabase is not configured" },
      { status: 503 }
    );
  }

  const form = await request.formData();
  const file = form.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json(
      { error: "Select an image first" },
      { status: 400 }
    );
  }

  const extension = allowedTypes[file.type];

  if (!extension) {
    return NextResponse.json(
      { error: "Only JPG, PNG and WebP images are allowed" },
      { status: 400 }
    );
  }

  if (file.size === 0 || file.size > 5 * 1024 * 1024) {
    return NextResponse.json(
      { error: "Image must be smaller than 5 MB" },
      { status: 400 }
    );
  }

  const bytes = await file.arrayBuffer();

  // Confirm the actual image signature, not just the file name.
  const header = new Uint8Array(bytes.slice(0, 12));

  const validJpeg =
    header[0] === 0xff &&
    header[1] === 0xd8 &&
    header[2] === 0xff;

  const validPng =
    header[0] === 0x89 &&
    header[1] === 0x50 &&
    header[2] === 0x4e &&
    header[3] === 0x47 &&
    header[4] === 0x0d &&
    header[5] === 0x0a &&
    header[6] === 0x1a &&
    header[7] === 0x0a;

  const validWebp =
    String.fromCharCode(...header.slice(0, 4)) === "RIFF" &&
    String.fromCharCode(...header.slice(8, 12)) === "WEBP";

  const valid =
    (extension === "jpg" && validJpeg) ||
    (extension === "png" && validPng) ||
    (extension === "webp" && validWebp);

  if (!valid) {
    return NextResponse.json(
      { error: "Invalid image file" },
      { status: 400 }
    );
  }

  const filename = `${randomUUID()}.${extension}`;

  try {
    const url = new URL(
      `/storage/v1/object/product-images/${filename}`,
      supabaseUrl
    );

    const response = await fetch(url, {
      method: "POST",
      headers: {
        apikey: anonKey,
        Authorization: `Bearer ${token}`,
        "Content-Type": file.type,
        "x-upsert": "false",
      },
      body: bytes,
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Image upload failed. Check Storage permissions." },
        { status: 400 }
      );
    }

    const publicUrl = new URL(
      `/storage/v1/object/public/product-images/${filename}`,
      supabaseUrl
    );

    return NextResponse.json({
      ok: true,
      url: publicUrl.toString(),
    });
  } catch {
    return NextResponse.json(
      { error: "Image upload service unavailable" },
      { status: 502 }
    );
  }
}

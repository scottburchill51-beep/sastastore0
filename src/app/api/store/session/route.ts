
import { NextResponse } from "next/server";

import {
  getSession,
  isAdmin,
} from "@/lib/store-backend";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { user, token } = await getSession();

    if (!user || !token) {
      return NextResponse.json(
        {
          loggedIn: false,
          isAdmin: false,
        },
        {
          headers: {
            "Cache-Control": "private, no-store",
          },
        },
      );
    }

    const admin = await isAdmin(
      user.id,
      token,
    );

    return NextResponse.json(
      {
        loggedIn: true,
        isAdmin: admin,
      },
      {
        headers: {
          "Cache-Control": "private, no-store",
        },
      },
    );
  } catch {
    return NextResponse.json(
      {
        loggedIn: false,
        isAdmin: false,
      },
      {
        headers: {
          "Cache-Control": "private, no-store",
        },
      },
    );
  }
}

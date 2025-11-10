export const dynamic = "force-dynamic";

import { users } from "@/lib/appwrite.config";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Read query parameters from the URL
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId)
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );

    const user = await users.get({
      userId,
    });
    return NextResponse.json(user);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

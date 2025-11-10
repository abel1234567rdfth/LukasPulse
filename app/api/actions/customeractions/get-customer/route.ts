export const dynamic = "force-dynamic";

import { databases, PRIVATE } from "@/lib/appwrite.config";
import { NextRequest, NextResponse } from "next/server";
import { Query } from "node-appwrite";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    const customer = await databases.listDocuments(
      PRIVATE.DATABASE_ID,
      PRIVATE.CUSTOMERS_TABLE_ID,
      userId ? [Query.equal("userId", userId)] : [] // only filter if provided
    );

    return NextResponse.json(customer);
  } catch (err: any) {
    console.error("Error fetching customer:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

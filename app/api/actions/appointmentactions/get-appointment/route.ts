export const dynamic = "force-dynamic";

import { databases, PRIVATE } from "@/lib/appwrite.config";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const appointmentId = searchParams.get("appointmentId");

    const appointment = await databases.getDocument({
      databaseId: PRIVATE.DATABASE_ID,
      collectionId: PRIVATE.APPOINTMENTS_TABLE_ID,
      documentId: appointmentId!,
    });
    return NextResponse.json(appointment);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

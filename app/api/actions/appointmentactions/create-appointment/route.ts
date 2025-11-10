export const dynamic = "force-dynamic";

import { databases, PRIVATE } from "@/lib/appwrite.config";
import { NextResponse } from "next/server";
import { ID } from "node-appwrite";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const appointmentData = body;

    const newAppointment = await databases.createDocument(
      PRIVATE.DATABASE_ID,
      PRIVATE.APPOINTMENTS_TABLE_ID,
      ID.unique(),
      appointmentData
    );

    return NextResponse.json(newAppointment);
  } catch (err: any) {
    console.error("Error creating appointment:", err);
    console.error("Error:", err);
    return NextResponse.json({ error: err.message || err }, { status: 500 });
  }
}

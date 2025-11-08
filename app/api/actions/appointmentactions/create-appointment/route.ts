import { databases, PRIVATE } from "@/lib/appwrite.config";
import { NextRequest, NextResponse } from "next/server";
import { ID } from "node-appwrite";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const appointmentData = body;
    console.log("Appointment data:", appointmentData);

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

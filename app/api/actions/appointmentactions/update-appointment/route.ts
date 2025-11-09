import { databases, PRIVATE } from "@/lib/appwrite.config";
import { error } from "console";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const appointmentToUpdate = body;

    const updatedAppointment = await databases.updateDocument(
      PRIVATE.DATABASE_ID!,
      PRIVATE.APPOINTMENTS_TABLE_ID!,
      appointmentToUpdate.appointmentId,
      appointmentToUpdate.appointment
    );
    if (!updatedAppointment) {
      throw new Error("appointment not found");
    }
    revalidatePath("/admin");

    return NextResponse.json(updatedAppointment);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";

import { databases, messaging, PRIVATE } from "@/lib/appwrite.config";
import { formatDateTime } from "@/lib/utils";
import { error } from "console";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ID } from "node-appwrite";

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

    async function sendSMS(userId: string, content: string) {
      try {
        const message = await messaging.createSMS({
          messageId: ID.unique(),
          content,

          users: [userId],
        });
      } catch (err: any) {
        console.error("Error sending SMS:", err.message);
      }
    }
    const smsMessage = `Hi, it's AppointBit. ${
      appointmentToUpdate.type === "schedule"
        ? `Your appointment has been scheduled for ${
            formatDateTime(appointmentToUpdate.appointment.schedule).dateTime
          } with Agent ${appointmentToUpdate.appointment.primaryAgent}`
        : `We regret to inform you that your appointment has been cancelled. Reason: ${appointmentToUpdate.appointment.cancellationReason}`
    }`;

    revalidatePath("/admin");

    await sendSMS(appointmentToUpdate.userId, smsMessage);

    return NextResponse.json(updatedAppointment);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

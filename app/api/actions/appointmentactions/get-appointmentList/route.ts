import { databases, PRIVATE } from "@/lib/appwrite.config";
import { Appointment } from "@/types/appwrite.types";
import { NextRequest, NextResponse } from "next/server";
import { Query } from "node-appwrite";

export async function GET(req: NextRequest) {
  try {
    const appointments = await databases.listDocuments(
      PRIVATE.DATABASE_ID,
      PRIVATE.APPOINTMENTS_TABLE_ID,
      [Query.orderDesc("$createdAt")] // only filter if provided
    );

    const counts = { scheduledCount: 0, pendingCount: 0, cancelledCount: 0 };
    appointments.documents.forEach(({ status }) => {
      if (status === "scheduled") counts.scheduledCount++;
      else if (status === "pending") counts.pendingCount++;
      else if (status === "cancelled") counts.cancelledCount++;
    });

    const data = {
      totalCount: appointments.total,
      ...counts,
      documents: appointments.documents,
    };

    return NextResponse.json(data);
  } catch (err: any) {
    console.error("Error fetching appointments:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

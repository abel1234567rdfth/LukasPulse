import { databases, PRIVATE } from "@/lib/appwrite.config";
import { NextRequest, NextResponse } from "next/server";
import { Query } from "node-appwrite";

export async function GET(req: NextRequest) {
  try {
    const appointments = await databases.listDocuments(
      PRIVATE.DATABASE_ID,
      PRIVATE.APPOINTMENTS_TABLE_ID,
      [Query.orderDesc("$createdAt")]
    );

    // Helper: fetch customer document for each appointment
    async function getAppointmentCustomer(document: any) {
      if (!document.customer) return document;

      const customerResult = await databases.listDocuments(
        PRIVATE.DATABASE_ID,
        PRIVATE.CUSTOMERS_TABLE_ID,
        [Query.equal("$id", document.customer)]
      );

      // Replace the ID with the actual customer document (first one)
      document.customer = customerResult.documents[0] || null;
      return document;
    }

    //  Wait for all customer data to load
    const updatedDocuments = await Promise.all(
      appointments.documents.map((doc) => getAppointmentCustomer(doc))
    );

    // Count appointments
    const counts = { scheduledCount: 0, pendingCount: 0, cancelledCount: 0 };
    updatedDocuments.forEach(({ status }) => {
      if (status === "scheduled") counts.scheduledCount++;
      else if (status === "pending") counts.pendingCount++;
      else if (status === "cancelled") counts.cancelledCount++;
    });

    const data = {
      totalCount: appointments.total,
      ...counts,
      documents: updatedDocuments,
    };

    return NextResponse.json(data);
  } catch (err: any) {
    console.error("Error fetching appointments:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";

import { databases, PUBLIC, PRIVATE, storage } from "@/lib/appwrite.config";
import { NextResponse } from "next/server";
import { ID } from "node-appwrite";
import { InputFile } from "node-appwrite/file";

export async function POST(req: Request) {
  try {
    // Parse multipart/form-data
    const formData = await req.formData();

    // Extract the uploaded file (if any)
    const identificationFile = formData.get(
      "identificationDocument"
    ) as Blob | null;

    // Prepare data object for database
    const data: Record<string, any> = {};

    // Loop through all formData entries
    formData.forEach((value, key) => {
      // Skip file fields
      if (
        identificationFile &&
        (key === "blobFile" ||
          key === "fileName" ||
          key === "identificationDocument")
      )
        return;

      // Handle date field
      if (key === "birthDate") {
        data[key] = new Date(value as string).toISOString();
        return;
      }

      // Handle boolean fields
      if (
        ["appointmentConsent", "disclosureConsent", "privacyConsent"].includes(
          key
        )
      ) {
        data[key] = value === "true";
        return;
      }

      // All other fields
      data[key] = value;
    });

    // Upload file to Appwrite storage if present
    if (identificationFile && identificationFile.size > 0) {
      const buffer = Buffer.from(await identificationFile.arrayBuffer());
      const inputFile = InputFile.fromBuffer(
        buffer,
        (identificationFile as File).name || "unknown_file"
      );

      const file = await storage.createFile(
        PUBLIC.BUCKET_ID,
        ID.unique(),
        inputFile
      );

      data.identificationDocumentId = file.$id;
      data.identificationDocumentUrl = `${PUBLIC.ENDPOINT}/storage/buckets/${
        PUBLIC.BUCKET_ID
      }/files/${file.$id}/view?project=${process.env.APPWRITE_PROJECT_ID!}`;
    }

    // Create the document in Appwrite
    const customer = await databases.createDocument(
      PRIVATE.DATABASE_ID,
      PRIVATE.CUSTOMERS_TABLE_ID,
      ID.unique(),
      data
    );

    return NextResponse.json(customer);
  } catch (err: any) {
    console.error("Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
// storage file name null
// 2:32:44

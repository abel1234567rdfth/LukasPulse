import { NextResponse } from "next/server";
import { users } from "@/lib/appwrite.config";
import { ID, Query } from "node-appwrite";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, name } = body;

    if (!email || !name) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    try {
      const user = await users.create({
        userId: ID.unique(),
        name,
        email,
      });
      return NextResponse.json(user);
    } catch (err: any) {
      if (err && err?.code === 409) {
        const existingUser = await users.list([Query.equal("email", [email])]);

        return NextResponse.json(existingUser.users[0]);
      }
    }
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

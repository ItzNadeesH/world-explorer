import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import { decrypt } from "@/lib/session";

export async function POST(req: Request) {
  try {
    const { code } = await req.json();

    // Retrieve session cookies to get the user ID
    const cookie = (await cookies()).get("session")?.value;
    if (!cookie) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Assuming you have a function to decrypt the session
    const session = await decrypt(cookie);
    if (!session?.userId) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userId = session.userId.toString();

    // Fetch the current user's document from the database
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    let favorites = user.favorites || [];

    // Check if the country is already in the favorites list
    if (favorites.includes(code)) {
      // If it's in the favorites list, remove it
      favorites = favorites.filter((fav) => fav !== code);
    } else {
      // If it's not in the favorites list, add it
      favorites.push(code);
    }

    // Update the user's favorites in the database
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { favorites },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error("Error updating favorite:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

import prisma from "@/lib/prisma";
import { decrypt } from "@/lib/session";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // 1. Get session from cookies
    const cookie = (await cookies()).get("session")?.value;
    const session = await decrypt(cookie);
    const userId = session?.userId;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Get user and their favorite cca3 codes
    const user = await prisma.user.findUnique({
      where: { id: userId.toString() },
      select: { favorites: true },
    });

    const favorites = user?.favorites || [];

    if (favorites.length === 0) {
      return NextResponse.json([]); // return empty list if no favorites
    }

    // 3. Fetch country data using the favorite codes
    const res = await fetch(
      `https://restcountries.com/v3.1/alpha?codes=${favorites.join(
        ","
      )}&fields=name,population,region,languages,flags,capital,cca3`
    );

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch countries" }, { status: res.status });
    }

    const countries = await res.json();

    // 4. Add isFavorite: true (optional, since they're all favorites)
    const enriched = countries.map((c: any) => ({
      ...c,
      isFavorite: true,
    }));

    return NextResponse.json(enriched);
  } catch (error: any) {
    console.error("Error fetching favorites:", error.message);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

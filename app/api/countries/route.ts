import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";
import prisma from "@/lib/prisma"; // Adjust path if needed

export async function GET(req: NextRequest) {
  try {
    // Fetch countries
    const res = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,population,region,languages,flags,capital,cca3"
    );

    if (!res.ok) {
      return NextResponse.json([], { status: res.status });
    }

    const countries = await res.json();

    // Get session from cookie
    const cookie = (await cookies()).get("session")?.value;
    const session = await decrypt(cookie);
    const userId = session?.userId;

    let favorites: string[] = [];

    // If user is logged in, get their favorites from DB
    if (userId) {
      const user = await prisma.user.findUnique({
        where: { id: userId.toString() },
        select: { favorites: true },
      });
      favorites = user?.favorites || [];
    }

    // Append isFavorite flag to each country
    const enrichedCountries = countries.map((country: any) => ({
      ...country,
      isFavorite: favorites.includes(country.cca3),
    }));

    return NextResponse.json(enrichedCountries);
  } catch (error: any) {
    console.error(error.message);
    return NextResponse.json([], { status: 500 });
  }
}

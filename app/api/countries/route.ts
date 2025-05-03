import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,population,region,languages,flags,capital,cca3"
    );
    if (!res.ok) {
      return NextResponse.json([], { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json([], { status: 500 });
  }
}

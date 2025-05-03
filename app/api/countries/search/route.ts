import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json([], { status: 400 });
  }

  try {
    const res = await fetch(`https://restcountries.com/v3.1/name/${query}`);
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

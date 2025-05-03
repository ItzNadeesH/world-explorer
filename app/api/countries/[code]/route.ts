import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { code: string } }) {
  const code = params.code.toUpperCase();
  try {
    const res = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
    if (!res.ok) {
      return NextResponse.json({ error: "Country not found" }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data[0]);
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json([], { status: 500 });
  }
}

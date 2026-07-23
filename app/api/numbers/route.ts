import { NextRequest, NextResponse } from "next/server";
import { getNumbers, saveNumbers, resetCounter } from "../../lib/store";

export async function GET() {
  const numbers = getNumbers();
  return NextResponse.json({ numbers });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { numbers } = body;

  if (!Array.isArray(numbers)) {
    return NextResponse.json({ error: "Numeros deve ser um array" }, { status: 400 });
  }

  if (numbers.length > 15) {
    return NextResponse.json({ error: "Maximo de 15 numeros" }, { status: 400 });
  }

  saveNumbers(numbers);
  resetCounter();
  return NextResponse.json({ success: true });
}

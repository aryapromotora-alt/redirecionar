import { NextRequest, NextResponse } from "next/server";
import { getNumbers, incrementCounter } from "../../lib/store";

export async function GET(request: NextRequest) {
  const numbers = getNumbers();

  if (numbers.length === 0) {
    return new NextResponse("Nenhum numero cadastrado", { status: 400 });
  }

  const searchParams = request.nextUrl.searchParams;
  const msg = searchParams.get("msg") || "Ola!";

  let counter = incrementCounter();
  const index = counter % numbers.length;
  const selectedNumber = numbers[index];

  const cleanNumber = selectedNumber.replace(/\D/g, "");
  const encodedMsg = encodeURIComponent(msg);

  return NextResponse.redirect(`https://wa.me/${cleanNumber}?text=${encodedMsg}`, 302);
}

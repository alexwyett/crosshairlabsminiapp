import { NextResponse } from "next/server";
import validateUser from "@/lib/validateUser";
import { BOT_TOKEN } from "@/lib/constants";

export async function POST(
  request: Request
) {
  try {
    const user = await validateUser(request, BOT_TOKEN);

    return NextResponse.json(
      user
    );
  } catch(e: any) {
    console.error(e?.message || 'An error occured')
    return NextResponse.json({ message: e?.message || 'An error occured' }, { status: 400 })
  }
}
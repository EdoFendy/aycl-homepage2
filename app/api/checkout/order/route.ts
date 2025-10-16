import { NextResponse } from "next/server";
import { driveTestOrderSchema, encryptCheckoutOrder } from "@/lib/checkout-encryption";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const candidate = body?.order ?? body;
    const parsed = driveTestOrderSchema.safeParse(candidate);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Ordine non valido.",
        },
        { status: 400 }
      );
    }

    const token = encryptCheckoutOrder(parsed.data);
    return NextResponse.json({ success: true, token });
  } catch (error) {
    console.error("Failed to encrypt checkout order", error);
    return NextResponse.json(
      {
        success: false,
        error: "Impossibile generare il link di checkout.",
      },
      { status: 500 }
    );
  }
}

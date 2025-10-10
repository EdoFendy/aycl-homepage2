import { NextResponse } from "next/server"

export async function GET(
  req: Request,
  { params }: { params: Promise<{ locale: string }> },
) {
  const { locale } = await params
  const url = new URL(req.url)
  const referer = req.headers.get("referer")
  const redirectTo = referer ?? `${url.origin}/`

  const res = NextResponse.redirect(redirectTo)
  res.cookies.set("NEXT_LOCALE", locale, { path: "/", maxAge: 60 * 60 * 24 * 365 })
  return res
}



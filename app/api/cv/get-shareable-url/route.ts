import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import kv from "@vercel/kv"

export async function POST(req: NextRequest) {
  const cookieStore = cookies()
  const supabase = createRouteHandlerClient({
    cookies: () => cookieStore,
  })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return NextResponse.json({ error: "Not authenticated" })
  }

  const { cv } = (await req.json()) as {
    cv?: any
  }

  const uuid = crypto.randomUUID()
  const timestamp = Date.now()

  try {
    await kv.set(`shared-cv-${uuid}`, { cv, timestamp })
    return NextResponse.json({ url: `/r/${uuid}` })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Something went wrong" })
  }
}

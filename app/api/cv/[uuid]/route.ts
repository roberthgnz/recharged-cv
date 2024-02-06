import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"

export async function PATCH(
  req: NextRequest,
  { params }: { params: { uuid: string } }
) {
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

  const uuid = params.uuid

  if (!uuid) return NextResponse.json({ error: "UUID is required" })

  try {
    const userId = session.user.id

    const payload = { cv, id: uuid, user_id: userId }

    const { error } = await supabase.from("resumes").upsert(payload)

    if (error) {
      throw new Error(error.message)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Something went wrong" })
  }
}

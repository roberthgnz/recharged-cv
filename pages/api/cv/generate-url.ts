import type { NextApiRequest, NextApiResponse } from "next"
import { cookies } from "next/headers"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import kv from "@vercel/kv"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cookieStore = cookies()
  const supabase = createRouteHandlerClient({
    cookies: () => cookieStore,
  })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) return res.status(401).json({ error: "Unauthorized" })

  const { cv } = req.body

  const uuid = crypto.randomUUID()
  const timestamp = Date.now()

  try {
    await kv.set(`shared-cv-${uuid}`, { cv, timestamp })
    return res.status(200).json({ url: `/r/${uuid}` })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: "Something went wrong" })
  }
}

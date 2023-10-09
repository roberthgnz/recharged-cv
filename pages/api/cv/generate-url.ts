import type { NextApiRequest, NextApiResponse } from "next"
import kv from "@vercel/kv"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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

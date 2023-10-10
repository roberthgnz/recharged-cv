"use server"

import { kv } from "@vercel/kv"

export async function getCvs(userId?: string | null) {
  if (!userId) {
    return []
  }

  const cvs = await kv.keys(`user:${userId}:cv:*`)

  if (!cvs) {
    return []
  }

  try {
    const pipeline = kv.pipeline()

    cvs.forEach((key) => pipeline.hgetall(key))

    const results = await pipeline.exec()

    return results as any[]
  } catch (error) {
    return []
  }
}

export async function getCv(id: string, userId: string) {
  const cv = await kv.hgetall(`user:${userId}:cv:${id}`)

  if (!cv || (userId && cv.userId !== userId)) {
    return null
  }

  return cv
}

export async function getSharedCv(id: string) {
  const keys = await kv.keys(`user:*:cv:${id}`)

  if (!keys) {
    return null
  }

  try {
    const pipeline = kv.pipeline()

    keys.forEach((key) => pipeline.hgetall(key))

    const results = await pipeline.exec()

    return results?.[0] ?? null
  } catch (error) {
    return null
  }
}

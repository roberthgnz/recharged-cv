import { headers } from "next/headers"
import { OpenAIStream, OpenAIStreamPayload } from "@/utils/OpenAIStream"
import Redis from "@/utils/redis"
import { Ratelimit } from "@upstash/ratelimit"

// Create a new ratelimiter, that allows 5 requests per 24 hours
const ratelimit = Redis
  ? new Ratelimit({
      redis: Redis,
      limiter: Ratelimit.fixedWindow(5, "1440 m"),
      analytics: true,
    })
  : undefined

export async function POST(req: Request) {
  const { prompt } = (await req.json()) as {
    prompt?: string
  }

  if (!prompt) {
    return new Response("No prompt in the request", { status: 400 })
  }

  // Rate Limiter Code
  if (ratelimit) {
    const headersList = headers()

    const ipIdentifier = headersList.get("x-real-ip")

    const result = await ratelimit.limit(ipIdentifier ?? "")

    if (!result.success) {
      return new Response(
        "Too many uploads in 1 day. Please try again in a 24 hours.",
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": result.limit,
            "X-RateLimit-Remaining": result.remaining,
          } as any,
        }
      )
    }
  }

  const payload: OpenAIStreamPayload = {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 300,
    stream: true,
    n: 1,
  }

  const stream = await OpenAIStream(payload)

  return new Response(stream)
}

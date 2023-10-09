"use client"

import { useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { toast } from "react-hot-toast"

import { Input } from "@/components/ui/input"

import { CallToAction } from "./cta"

export const Hero = () => {
  const supabase = createClientComponentClient()

  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  const signIn = async () => {
    if (!email) return toast.error("Please enter your email")

    setLoading(true)

    const { error } = await supabase.auth.signInWithOtp({ email })

    if (error) {
      setLoading(false)
      return toast.error(error.message)
    }

    setLoading(false)

    toast.success("Check your email for the login link!")
  }

  return (
    <div className="flex h-full max-w-7xl">
      <div className="mx-auto max-w-7xl">
        <div className="relative z-10 mx-auto lg:w-full lg:max-w-2xl">
          <div className="mx-auto max-w-7xl px-4 text-white sm:px-6 lg:px-8">
            <h2 className="mb-4 text-4xl font-extrabold tracking-tight">
              <i>Introducing AI Resume Builder</i> <br /> Your Path to a
              Stunning Professional Profile!
            </h2>
            <p className="mx-auto mb-4 max-w-md text-base text-[#f5f5f5cc] md:mt-5 md:max-w-3xl">
              Are you tired of the same old, boring resume templates? Want to
              stand out from the crowd with a visually stunning and unique
              resume? Look no further! With our AI Resume Builder, you can
              create a personalized and eye-catching resume that will leave a
              lasting impression on potential employers.
            </p>

            <div id="email-target"></div>

            <Input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Type your email"
              className="text-black"
            />

            <CallToAction onClick={signIn} disabled={loading}>
              {loading ? "Loading..." : "Get Started"}
            </CallToAction>
          </div>
        </div>
      </div>
    </div>
  )
}

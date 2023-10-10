"use client"

import { useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { toast } from "react-hot-toast"

import { Input } from "@/components/ui/input"

import { Button } from "./ui/button"

export const Hero = () => {
  const supabase = createClientComponentClient()

  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  const signIn = async () => {
    if (!email) return toast.error("Please enter your email")

    setLoading(true)

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: "https://www.rcv.digital/",
      },
    })

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
          <div className="mx-auto max-w-7xl px-4 text-center  sm:px-6 lg:px-8">
            <h2 className="font-extrabold tracking-tight md:text-6xl">
              AI Resume Builder
            </h2>
            <p className="mx-auto mb-4 max-w-md text-base tracking-tight text-[#1e0825] md:mt-2 md:max-w-3xl ">
              Your Path to a Stunning Professional Profile!
            </p>
            <div id="email-target"></div>
            <div className="space-y-4">
              <Input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Type your email"
                className="text-black"
              />

              <Button size={"lg"} onClick={signIn} disabled={loading}>
                {loading ? "Loading..." : "Get Started"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

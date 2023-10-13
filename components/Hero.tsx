import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AuthMessages } from "@/components/auth-messages"

export const Hero = () => {
  return (
    <div className="relative overflow-hidden md:rounded-3xl">
      <div className="absolute inset-x-0 z-20 h-full w-full md:glass-xl/16">
        <div className="absolute inset-0 md:bg-white/[0.025]"></div>
        <div className="absolute inset-0"></div>
      </div>
      <div className="relative z-30 flex h-fit max-w-7xl p-10">
        <div className="mx-auto max-w-7xl">
          <div className="relative z-10 mx-auto lg:w-full lg:max-w-2xl">
            <form
              action="/auth/sign-in"
              method="post"
              className="mx-auto max-w-7xl px-4 text-center  sm:px-6 lg:px-8"
            >
              <h2 className="font-extrabold tracking-tight md:text-6xl">
                AI Resume Builder
              </h2>
              <p className="mx-auto mb-4 max-w-md text-base tracking-tight  md:mt-2 md:max-w-3xl ">
                Your Path to a Stunning Professional Profile!
              </p>
              <div id="email-target"></div>
              <div className="space-y-4">
                <div className="relative space-y-2">
                  <Input
                    type="email"
                    name="email"
                    placeholder="Type your email"
                    className="border border-white/10 bg-white/10"
                  />
                  <p className="text-xs text-muted-foreground">
                    If you already have an account, we&#39;ll log you in
                  </p>
                </div>
                <div className="!mt-10 flex flex-col gap-4 md:flex-col">
                  <Button
                    type="submit"
                    size={"lg"}
                    className="rounded-lg bg-gradient-to-tl from-purple-700 to-pink-500 text-xs font-bold uppercase text-white shadow-md transition-all hover:bg-gradient-to-tl hover:from-pink-500 hover:to-purple-700 hover:shadow-lg"
                  >
                    Get started for free
                  </Button>
                  <span className="text-xs">No credit card required</span>
                </div>
                <AuthMessages />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

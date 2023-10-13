import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"

import Messages from "./messages"

export const dynamic = "force-dynamic"

export default async function Login() {
  return (
    <div className="flex w-full flex-1 flex-col justify-center gap-2 px-8 sm:max-w-md">
      <form
        className="flex w-full flex-1 flex-col justify-center gap-2 "
        action="/auth/sign-in"
        method="post"
      >
        <Card>
          <CardHeader>
            <CardTitle>Log In / Sign Up</CardTitle>
            <CardDescription>
              Log into your account or sign up for a new one to get started.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Label className="text-md" htmlFor="email">
              Email
            </Label>
            <input
              className="rounded-md border bg-inherit px-4 py-2"
              name="email"
              placeholder="you@example.com"
              required
            />
            <Button>Continue</Button>
            <Messages />
          </CardContent>
          <CardFooter>
            <p className="text-sm">
              By signing up, you agree to our{" "}
              <a href="#" className="underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="underline">
                Privacy Policy
              </a>
              .
            </p>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}

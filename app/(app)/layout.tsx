import { Suspense } from "react"
import { Inter } from "next/font/google"
import { redirect } from "next/navigation"
import { Analytics } from "@vercel/analytics/react"
import { Toaster } from "react-hot-toast"

import { getServerSession } from "@/utils/auth"

import "../globals.css"

import Link from "next/link"

import { Title } from "@/components/ui/title"
import { Footer } from "@/components/Footer"
import { Nav } from "@/components/Nav"
import { NavLoading } from "@/components/NavLoading"
import { NavTabs } from "@/components/NavTabs"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Recharged CV",
  description: "AI Resume Builder",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()

  if (!session) {
    return redirect("/")
  }

  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className={`h-full ${inter.className}`}>
        <Suspense fallback={<NavLoading />}>
          <Nav />
        </Suspense>
        <div className="mx-auto my-8 flex h-full max-w-7xl flex-col px-4 sm:px-6 lg:px-8">
          <Title>
            <Link href="/">My resumes</Link>
          </Title>
          <NavTabs />
          <div className="mb-8 flex-1">{children}</div>
          <Footer isDark={false} isFixed={false} />
        </div>
        <Toaster
          position="bottom-center"
          reverseOrder={false}
          toastOptions={{ duration: 5000 }}
        />
        <Analytics />
      </body>
    </html>
  )
}

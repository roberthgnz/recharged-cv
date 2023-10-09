import { Suspense } from "react"
import { Inter } from "next/font/google"
import { redirect } from "next/navigation"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { Analytics } from "@vercel/analytics/react"
import { getServerSession } from "next-auth"
import { Toaster } from "react-hot-toast"

import "../globals.css"

import { Title } from "@/components/ui/title"
import { Footer } from "@/components/Footer"
import { Nav } from "@/components/Nav"
import { NavLoading } from "@/components/NavLoading"
import { NavTabs } from "@/components/NavTabs"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Recharged CV",
  description:
    "Create Your Perfect CV: Empower Your Career with our Resume Generator!",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return redirect("/login")
  }

  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className={`h-full ${inter.className}`}>
        <Suspense fallback={<NavLoading />}>
          <Nav />
        </Suspense>
        <div className="flex flex-col h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
          <Title>My resumes</Title>
          <NavTabs />
          <div className="flex-1 mb-8">{children}</div>
          <Footer isDark={false} isFixed={false} />
        </div>
        <Toaster
          position="bottom-center"
          reverseOrder={false}
          toastOptions={{ duration: 2000 }}
        />
        <Analytics />
      </body>
    </html>
  )
}

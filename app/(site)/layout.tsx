import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import { Toaster } from "react-hot-toast"

import "../globals.css"

import Image from "next/image"
import Link from "next/link"

import { Footer } from "@/components/Footer"

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
  return (
    <html lang="en">
      <body className={`h-full ${inter.className}`}>
        <header className="fixed left-1/2 top-5 z-30 mx-auto w-full max-w-7xl  -translate-x-1/2 overflow-hidden rounded-full px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-x-0 z-20 h-full w-full glass-xl/16 ">
            <div className="absolute inset-0 bg-white/[0.025]"></div>
            <div className="absolute inset-0 glass-edge-3xl"></div>
          </div>
          <nav className="relative z-30 flex h-16 justify-center">
            <h1 className="flex shrink-0 items-center font-bold ">
              <Link href="/">Recharged CV</Link>
            </h1>
          </nav>
        </header>

        <main className="flex min-h-screen w-full flex-col items-center justify-center py-16">
          {children}
        </main>
        <Toaster
          position="bottom-center"
          reverseOrder={false}
          toastOptions={{ duration: 5000 }}
        />
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}

import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import { Toaster } from "react-hot-toast"

import "../globals.css"

import Link from "next/link"

import { Footer } from "@/components/Footer"

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
  return (
    <html lang="en">
      <body
        className={`${inter.className} h-full scroll-smooth bg-[#111] text-white antialiased`}
      >
        <header className="fixed left-0 top-0 z-30 mx-auto w-full overflow-hidden px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-x-0 z-20 h-full w-full glass-xl/16">
            <div className="absolute inset-0 bg-white/[0.025]"></div>
            <div className="absolute inset-0 glass-edge-3xl"></div>
          </div>
          <nav className="relative z-30 flex h-16 justify-center">
            <h1 className="flex shrink-0 items-center font-bold ">
              <Link href="/">Recharged CV</Link>
            </h1>
          </nav>
        </header>
        <main className="relative flex min-h-screen w-full flex-col items-center justify-center py-16">
          <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-16">
            <div className="flex flex-col items-center justify-center">
              {children}
            </div>
          </div>
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

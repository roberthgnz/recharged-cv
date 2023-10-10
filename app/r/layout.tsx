import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"

import "../globals.css"

export const metadata = {
  title: "Recharged CV",
  description: "AI Resume Builder",
}

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`h-full bg-gray-200 p-8 relative ${inter.className}`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}

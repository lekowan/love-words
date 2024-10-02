import type { Metadata } from "next"
import "./globals.css"

import { Noto_Sans_JP } from "next/font/google"

const notoSans = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400"],
})

export const metadata: Metadata = {
  title: "love words",
  description: "A simple reading app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${notoSans.className} antialiased brush-strokes`}>
        {children}
      </body>
    </html>
  )
}

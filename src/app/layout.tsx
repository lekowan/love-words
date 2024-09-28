import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"

import { Noto_Sans } from "next/font/google"

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-noto-sans",
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
      <body className={`${notoSans.variable} ${notoSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}

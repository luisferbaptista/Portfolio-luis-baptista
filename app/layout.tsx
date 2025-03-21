import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Luis Baptista | Portfolio",
  description: "Software Developer Portfolio",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="custom-scrollbar">
      <head>
        <style>
          {`
            html, body, * {
              cursor: none !important;
            }
            @media (max-width: 768px) {
              html, body, * {
                cursor: auto !important;
              }
              a, button, [role="button"], .cursor-pointer {
                cursor: pointer !important;
              }
            }
          `}
        </style>
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '树屋解压站',
  description: '一个帮助你放松和解压的温馨小站',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body className={`${inter.className} bg-gradient-to-br from-green-50 to-blue-50`}>
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-[url('/treehouse-relax/images/tree-bg.svg')] opacity-10 bg-repeat animate-float"></div>
        </div>
        {children}
      </body>
    </html>
  )
}
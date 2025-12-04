import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'LINE自治体普及率ダッシュボード',
  description: '日本全国の自治体におけるLINE公式アカウントの友だち数と人口データを組み合わせ、対人口比での普及率を可視化',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className="antialiased">{children}</body>
    </html>
  )
}

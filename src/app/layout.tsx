'use client'
import { Inter } from 'next/font/google'
import { ConfigProvider } from 'antd'
import { ProgressBar } from '../Components/progressBar'
import { configTheme } from './style/theme'
import localFont from 'next/font/local'
import ReactQueryClientProvider from '../../providers/QueryClientProvider'
import '../../style/globals.css'
import { AntdRegistry } from '@ant-design/nextjs-registry'

const inter = Inter({ subsets: ['latin'], weight: ['400', '700', '900'] })
const boston = localFont({
  src: '../fonts/Boston.otf',
  variable: '--font-boston'
})

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`${inter.className} ${boston.variable} antialiased`}>
        <AntdRegistry>
          <ConfigProvider theme={configTheme}>
            <ReactQueryClientProvider>{children}</ReactQueryClientProvider>
          </ConfigProvider>
          <ProgressBar />
        </AntdRegistry>
      </body>
    </html>
  )
}

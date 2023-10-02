import type { Metadata } from 'next'
import '../styles/globals.css'
import ReduxProvider from '../context/ReduxProvider'
import ThemeProvider from '../context/ThemeProvider'
import ModalRoot from '../containers/modals/ModalRoot/ModalRoot'

export const metadata: Metadata = {
  title: 'AwsömRE',
  description: "Search That Doesn't Suck™"
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    // Using suppressHydrationWarning per next-themes docs because next-themes updates <html>, which will always cause a
    // warning
    <html lang='en' suppressHydrationWarning>
      <body>
        <ReduxProvider>
          <ThemeProvider>
            {children}
            <ModalRoot />
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  )
}

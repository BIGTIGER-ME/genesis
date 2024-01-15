import { PropsWithChildren } from 'react'
import { ThemeProvider } from 'next-themes'

function Provider({ children }: PropsWithChildren) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {children}
    </ThemeProvider>
  )
}

export default Provider

import { Head, Html, Main, NextScript, DocumentProps } from 'next/document'

function MyDocument({ locale }: DocumentProps) {
  return (
    <Html lang={locale ?? 'en'}>
      <Head />
      <body className="min-h-screen bg-background font-sans antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default MyDocument

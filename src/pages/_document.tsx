import { Head, Html, Main, NextScript, DocumentProps } from 'next/document'

function MyDocument({ locale }: DocumentProps) {
  return (
    <Html lang={locale ?? 'en'}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default MyDocument

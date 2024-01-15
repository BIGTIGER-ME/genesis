import { Server } from 'styletron-engine-monolithic'
import { sheetT as Sheet } from 'styletron-engine-monolithic/lib/server/server'
import { DocumentContext, Head, Html, Main, NextScript, DocumentInitialProps, DocumentProps } from 'next/document'
import { Provider as StyletronProvider } from 'styletron-react'
import { STYLETRON_HYDRATE_KEY } from 'constants/styles'
import { styletron } from 'utils/styles'

type DocumentOwnProps = {
  stylesheets: Sheet[]
}

function MyDocument({ stylesheets, locale }: DocumentProps & DocumentOwnProps) {
  return (
    <Html lang={locale ?? 'en'}>
      <Head>
        {stylesheets.map((sheet, i) => (
          <style
            key={i}
            className={STYLETRON_HYDRATE_KEY}
            dangerouslySetInnerHTML={{ __html: sheet.css }}
            media={sheet.attrs.media}
            data-hydrate={sheet.attrs['data-hydrate']}
          />
        ))}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

MyDocument.getInitialProps = async (ctx: DocumentContext): Promise<DocumentInitialProps & DocumentOwnProps> => {
  const initialProps = await ctx.renderPage({
    enhanceApp: App => props => (
      <StyletronProvider value={styletron}>
        <App {...props} />
      </StyletronProvider>
    )
  })
  let stylesheets: Sheet[] = []

  if (styletron instanceof Server) {
    stylesheets = styletron.getStylesheets()
  }

  return { ...initialProps, stylesheets }
}

export default MyDocument

import App, { AppProps, AppContext, AppInitialProps } from 'next/app'
import { Inter as FontSans } from 'next/font/google'
import { Messages } from '@lingui/core'
import * as I18n from 'components/i18n'
import * as Theme from 'components/theme'
import { loadCatalog } from 'utils/lingui'
import 'styles/globals.css'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
})

type AppOwnProps = {
  messages: Messages
}

type Props = AppProps & AppOwnProps

function MyApp({ Component, messages, pageProps }: Props) {
  return (
    <>
      <style jsx global>{`
        :root {
          --font-sans: ${fontSans.variable};
        }
      `}</style>
      <Theme.Provider>
        <I18n.Provider messages={messages}>
          <Component {...pageProps} />
        </I18n.Provider>
      </Theme.Provider>
    </>
  )
}

MyApp.getInitialProps = async (context: AppContext): Promise<AppOwnProps & AppInitialProps> => {
  const props = await App.getInitialProps(context)
  const messages = await loadCatalog(context.ctx.locale!)

  return { ...props, messages }
}

export default MyApp

import App, { AppProps, AppContext, AppInitialProps } from 'next/app'
import { Messages } from '@lingui/core'
import * as I18n from 'components/i18n'
import { loadCatalog } from 'utils/lingui'
import 'styles/globals.css'

type AppOwnProps = {
  messages: Messages
}

type Props = AppProps & AppOwnProps

function MyApp({ Component, messages, pageProps }: Props) {
  return (
    <I18n.Provider messages={messages}>
      <Component {...pageProps} />
    </I18n.Provider>
  )
}

MyApp.getInitialProps = async (context: AppContext): Promise<AppOwnProps & AppInitialProps> => {
  const props = await App.getInitialProps(context)
  const messages = await loadCatalog(context.ctx.locale!)

  return { ...props, messages }
}

export default MyApp

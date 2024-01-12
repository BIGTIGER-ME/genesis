import { PropsWithChildren } from 'react'
import { i18n, Messages } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import { useI18nInit } from 'hooks/useI18n'

interface Props {
  messages: Messages
}

function Provider({ messages, children }: PropsWithChildren<Props>) {
  useI18nInit(messages)

  return <I18nProvider i18n={i18n}>{children}</I18nProvider>
}

export default Provider

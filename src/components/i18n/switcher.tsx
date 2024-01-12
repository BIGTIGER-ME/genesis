import { useRouter } from 'next/router'
import { useState } from 'react'
import { msg } from '@lingui/macro'
import { MessageDescriptor } from '@lingui/core'
import { useLingui } from '@lingui/react'

type LOCALES = 'en' | 'zh_cn' | 'pseudo'

const languages: { [key: string]: MessageDescriptor } = {
  en: msg`English`,
  zh_cn: msg`Chinese Simplified`
}

export default function Switcher() {
  const router = useRouter()
  const { i18n } = useLingui()
  const [locale, setLocale] = useState<LOCALES>(router.locale!.split('-')[0] as LOCALES)

  return (
    <select
      value={locale}
      onChange={e => {
        const locale = e.target.value as LOCALES

        setLocale(locale)
        router.push(router.pathname, router.pathname, { locale })
      }}
    >
      {Object.keys(languages).map(locale => (
        <option key={locale} value={locale}>
          {i18n._(languages[locale as LOCALES])}
        </option>
      ))}
    </select>
  )
}

import { useRouter } from 'next/router'
import { useState } from 'react'
import { msg } from '@lingui/macro'
import { MessageDescriptor } from '@lingui/core'
import { useLingui } from '@lingui/react'
import { Select, SIZE } from 'baseui/select'

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
    <Select
      size={SIZE.mini}
      clearable={false}
      value={locale ? [{ id: locale }] : []}
      options={Object.keys(languages).map(locale => ({
        label: i18n._(languages[locale as LOCALES]),
        id: locale
      }))}
      onChange={params => {
        if (!params.option) return
        const locale = params.option.id as LOCALES

        setLocale(locale)
        router.push(router.pathname, router.pathname, { locale })
      }}
    />
  )
}

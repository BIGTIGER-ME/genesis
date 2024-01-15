import { useRouter } from 'next/router'
import { useState } from 'react'
import { msg } from '@lingui/macro'
import { MessageDescriptor } from '@lingui/core'
import { useLingui } from '@lingui/react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'components/ui/select'

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
      value={locale}
      onValueChange={locale => {
        setLocale(locale as LOCALES)
        router.push(router.pathname, router.pathname, { locale })
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {Object.keys(languages).map(locale => (
          <SelectItem key={locale} value={locale}>
            {i18n._(languages[locale as LOCALES])}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

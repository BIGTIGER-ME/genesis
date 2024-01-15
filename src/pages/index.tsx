import { t, Trans } from '@lingui/macro'
import { NextPage } from 'next'
import Head from 'next/head'
import { useLingui } from '@lingui/react'
import * as I18n from 'components/i18n'
import * as Sentry from 'components/sentry'
import * as Theme from 'components/theme'
import StyledText from 'components/styled-text'
import styles from './index.module.scss'

const libs = [
  { name: 'Next.js', link: 'https://nextjs.org' },
  { name: 'Lingui', link: 'https://lingui.dev', extra: <I18n.Switcher /> },
  { name: 'Sentry', link: 'https://sentry.io', extra: <Sentry.ThrowError /> },
  {
    name: 'BaseUI',
    link: 'https://baseweb.design',
    extra: (
      <>
        <Theme.Switcher />
        <StyledText className={styles.styled} />
      </>
    )
  }
]

const Index: NextPage = () => {
  useLingui()

  return (
    <div className={styles.root}>
      <Head>
        <title>{t`Genesis`}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className={styles.title}>
          <Trans>Welcome to Genesis!</Trans>
        </h1>
        <p>
          <Trans>The Birthplace of Breakthrough Ideas</Trans>
        </p>
        <ul className={styles.list}>
          {libs.map((item, i) => (
            <li key={i}>
              <div className={styles.item}>
                <a className={styles.error} href={item.link}>
                  {item.name}
                </a>
                {item.extra}
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}

export default Index

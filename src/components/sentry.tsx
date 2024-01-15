import { Trans } from '@lingui/macro'
import * as Sentry from '@sentry/nextjs'
import { Button, SIZE } from 'baseui/button'

export function ThrowError() {
  return (
    <>
      <Button
        size={SIZE.mini}
        onClick={() => {
          Sentry.startSpan(
            {
              name: 'Example Frontend Span',
              op: 'test'
            },
            () => {
              throw new Error('Sentry Example Frontend Error')
            }
          )
        }}
      >
        <Trans>Client Error</Trans>
      </Button>
      <Button
        size={SIZE.mini}
        onClick={async () => {
          await fetch('/api/error')
        }}
      >
        <Trans>Server Error</Trans>
      </Button>
    </>
  )
}

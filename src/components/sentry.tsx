import { Trans } from '@lingui/macro'
import * as Sentry from '@sentry/nextjs'
import { Button } from 'components/ui/button'

export function ThrowError() {
  return (
    <>
      <Button
        type="button"
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
        type="button"
        onClick={async () => {
          await fetch('/api/error')
        }}
      >
        <Trans>Server Error</Trans>
      </Button>
    </>
  )
}

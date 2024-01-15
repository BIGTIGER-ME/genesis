import { Trans } from '@lingui/macro'
import * as Sentry from '@sentry/nextjs'

export function ThrowError() {
  return (
    <>
      <button
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
      </button>
      <button
        type="button"
        onClick={async () => {
          await fetch('/api/error')
        }}
      >
        <Trans>Server Error</Trans>
      </button>
    </>
  )
}

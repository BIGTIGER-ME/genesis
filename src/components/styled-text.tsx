import { LabelSmall } from 'baseui/typography'
import { Trans } from '@lingui/macro'
import { useTheme } from 'hooks/useTheme'

interface Props {
  className?: string
}

function StyledText({ className }: Props) {
  const { theme } = useTheme()

  return (
    <LabelSmall
      overrides={{
        Block: { props: { className } }
      }}
    >
      <Trans>
        Styled by <i style={{ color: theme.colors.red400 }}>hooks</i>
      </Trans>
    </LabelSmall>
  )
}

export default StyledText

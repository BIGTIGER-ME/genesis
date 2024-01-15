import { Button, KIND, SIZE } from 'baseui/button'
import { ThemeType } from 'constants/styles'
import useTheme, { useToggle } from 'hooks/useTheme'

function Switcher() {
  const { themeType } = useTheme()
  const toggle = useToggle()

  return (
    <Button size={SIZE.mini} kind={KIND.secondary} onClick={toggle}>
      {themeType === ThemeType.Dark ? '☀️' : '🌛'}
    </Button>
  )
}

export default Switcher

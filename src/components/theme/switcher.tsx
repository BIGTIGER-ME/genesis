import { useTheme } from 'next-themes'
import { MoonIcon, SunIcon } from '@radix-ui/react-icons'
import { Button } from 'components/ui/button'
import { ThemeType } from 'constants/styles'

function Switcher() {
  const { theme, setTheme } = useTheme()

  return (
    <Button size="icon" onClick={() => setTheme(theme === ThemeType.Light ? ThemeType.Dark : ThemeType.Light)}>
      <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  )
}

export default Switcher

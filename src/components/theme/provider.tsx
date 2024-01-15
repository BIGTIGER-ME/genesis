import { useState, createContext, PropsWithChildren } from 'react'
import { Provider as StyletronProvider } from 'styletron-react'
import { BaseProvider } from 'baseui'
import { ThemeType } from 'constants/styles'
import { useAdaptiveTheme } from 'hooks/useTheme'
import { styletron } from 'utils/styles'

export const ThemeContext = createContext<{
  themeType: ThemeType
  setThemeType: (themeType: ThemeType) => void
}>({
  themeType: ThemeType.System,
  setThemeType: () => {}
})

function Provider({ children }: PropsWithChildren) {
  const [themeType, setThemeType] = useState(ThemeType.System)
  const theme = useAdaptiveTheme(themeType)

  return (
    <ThemeContext.Provider value={{ themeType, setThemeType }}>
      <StyletronProvider value={styletron}>
        <BaseProvider theme={theme}>{children}</BaseProvider>
      </StyletronProvider>
    </ThemeContext.Provider>
  )
}

export default Provider

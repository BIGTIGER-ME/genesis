import { useState, useEffect, useContext, useCallback } from 'react'
import { LightTheme, DarkTheme, useStyletron } from 'baseui'
import { ThemeContext } from 'components/theme'
import { ThemeType } from 'constants/styles'
import { convertObjectToCssVars } from 'utils/styles'

// useAdaptiveTheme: A React hook for dynamically applying a theme based on the ThemeType
// It switches between light and dark themes, or follows the system preference
export const useAdaptiveTheme = (themeType: ThemeType) => {
  // state to hold the current theme, defaulting to LightTheme.
  const [theme, setTheme] = useState(LightTheme)

  // handle theme changes based on themeType
  useEffect(() => {
    switch (themeType) {
      case ThemeType.Light:
        setTheme(LightTheme)
        break

      case ThemeType.Dark:
        setTheme(DarkTheme)
        break

      case ThemeType.System:
      default:
        // if theme type is system
        // we need to listen for system theme changes and apply theme accordingly
        const media = window.matchMedia('(prefers-color-scheme: dark)')
        const listener = (e: MediaQueryListEvent) => {
          setTheme(e.matches ? DarkTheme : LightTheme)
        }

        setTheme(media.matches ? DarkTheme : LightTheme)
        media.addEventListener('change', listener)

        return () => media.removeEventListener('change', listener)
    }
  }, [themeType])

  // apply the selected baseui theme as sass variables, and set global styles
  useEffect(() => {
    const style = document.createElement('style')
    const { animation, colors, lighting, sizing, typography, zIndex } = theme
    const { useRoundedCorners, ...borders } = theme.borders
    const varibles = convertObjectToCssVars(
      {
        animation,
        borders,
        colors,
        lighting,
        sizing,
        typography,
        zIndex
      },
      '--theme-baseui'
    )

    document.body.style.setProperty('background', theme.colors.backgroundSecondary)
    document.body.style.setProperty('color', theme.colors.contentPrimary)
    style.innerText = `:root {${varibles.reduce((res, [key, value]) => {
      return res + `${key}: ${value};`
    }, '')}}`
    document.head.appendChild(style)

    return () => {
      document.body.style.removeProperty('background')
      document.body.style.removeProperty('color')
      document.head.removeChild(style)
    }
  }, [theme])

  return theme
}

export const useTheme = () => {
  const [, theme] = useStyletron()
  const { themeType, setThemeType } = useContext(ThemeContext)

  return { theme, themeType, setThemeType }
}

export const useToggle = () => {
  const { themeType, setThemeType } = useTheme()

  return useCallback(() => {
    switch (themeType) {
      case ThemeType.Light:
        setThemeType(ThemeType.Dark)
        break

      case ThemeType.Dark:
        setThemeType(ThemeType.Light)
        break

      case ThemeType.System:
      default:
        const media = window.matchMedia('(prefers-color-scheme: dark)')

        setThemeType(media.matches ? ThemeType.Light : ThemeType.Dark)
    }
  }, [themeType, setThemeType])
}

export default useTheme

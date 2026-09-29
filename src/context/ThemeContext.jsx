import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext(null)

export const THEME_OPTIONS = [
  { value: 'Light',  label: 'Light (Odoo Classic)' },
  { value: 'Dark',   label: 'Dark Mode' },
  { value: 'System', label: 'System Default' },
]

function resolveTheme(theme) {
  if (theme !== 'System') return theme
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'Dark' : 'Light'
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('stocksense-theme') || 'Light')

  useEffect(() => {
    const apply = () => {
      document.documentElement.setAttribute('data-theme', resolveTheme(theme))
    }
    apply()
    localStorage.setItem('stocksense-theme', theme)

    if (theme === 'System') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)')
      mq.addEventListener('change', apply)
      return () => mq.removeEventListener('change', apply)
    }
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)

// ────────── Density ──────────
const DensityContext = createContext(null)

export const DENSITY_OPTIONS = [
  { value: 'Compact',     label: 'Compact (ERP Dense)' },
  { value: 'Comfortable', label: 'Comfortable (Standard)' },
  { value: 'Spacious',    label: 'Spacious' },
]

export function DensityProvider({ children }) {
  const [density, setDensity] = useState(() => localStorage.getItem('stocksense-density') || 'Comfortable')

  useEffect(() => {
    document.documentElement.setAttribute('data-density', density)
    localStorage.setItem('stocksense-density', density)
  }, [density])

  return (
    <DensityContext.Provider value={{ density, setDensity }}>
      {children}
    </DensityContext.Provider>
  )
}

export const useDensity = () => useContext(DensityContext)



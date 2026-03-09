// Server Component — injects theme CSS variables into <head>
// This runs at build time, so no flash of unstyled content

import { themeTokens } from '@/themes'

export default function ThemeProvider() {
  const cssVars = Object.entries(themeTokens.vars)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join('\n')

  return (
    <style
      id="theme-vars"
      dangerouslySetInnerHTML={{ __html: `:root {\n${cssVars}\n}` }}
    />
  )
}

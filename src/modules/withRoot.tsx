import * as React from 'react'
import { ThemeProvider, CssBaseline } from '@mui/material'
import theme from './theme'  // your MUI theme config file

export default function withRoot(Component: React.ComponentType) {
  return function WithRoot(props: any) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...props} />
      </ThemeProvider>
    )
  }
}

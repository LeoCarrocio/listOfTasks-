import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { UiProvider } from '../context/UIContext'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { LightTheme, DarkTheme } from '../themes'
import { EntriesProvider } from '../context/Entries'
import { SnackbarProvider } from 'notistack';




function MyApp({ Component, pageProps }: AppProps) {
  return(
    <SnackbarProvider>
      <EntriesProvider>
        <UiProvider>
          <ThemeProvider theme={ DarkTheme }>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </UiProvider>
      </EntriesProvider>
    </SnackbarProvider>
  ) 
}

export default MyApp

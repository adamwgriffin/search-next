import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider as ReduxProvider } from 'react-redux'
import { ThemeProvider } from 'next-themes'
import ModalRoot from '../containers/modals/ModalRoot/ModalRoot'
import store from '../store'

function App({ Component, pageProps }: AppProps) {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider disableTransitionOnChange>
        <>
          <Component {...pageProps} />
          <ModalRoot />
        </>
      </ThemeProvider>
    </ReduxProvider>
  )
}

export default App

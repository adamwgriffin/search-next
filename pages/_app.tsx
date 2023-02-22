import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider as ReduxProvider } from 'react-redux'
import { ThemeProvider } from 'next-themes'
import Modal from '../containers/Modal/Modal'
import store from '../store'

function App({ Component, pageProps }: AppProps) {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider disableTransitionOnChange>
        <>
          <Component {...pageProps} />
          <Modal />
        </>
      </ThemeProvider>
    </ReduxProvider>
  )
}

export default App

import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'

import { store } from '../redux/store'
// import { ThemeProvider } from 'next-themes'

import 'styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      {/* <ThemeProvider attribute='class' disableTransitionOnChange> */}
      <Component {...pageProps} />
      {/* </ThemeProvider> */}
    </Provider>
  )
}

export default MyApp

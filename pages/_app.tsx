import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'

import Container from 'components/layout/container'
import Loading from 'components/molecules/Loading'

import { store } from '../redux/store'

import 'styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Container>
        <Loading />
        <Component {...pageProps} />
      </Container>
    </Provider>
  )
}

export default MyApp

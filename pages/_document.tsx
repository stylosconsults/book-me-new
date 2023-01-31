import Document, { Head, Html, Main, NextScript } from 'next/document'
import Script from 'next/script'

class MyDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head>
          <link
            rel='preload'
            href='/fonts/inter-var-latin.woff2'
            as='font'
            type='font/woff2'
            crossOrigin='anonymous'
          />
          <link href='/static/favicons/favicon.ico' rel='shortcut icon' />
          <link href='/static/favicons/site.webmanifest' rel='manifest' />
          <link
            href='/static/favicons/apple-touch-icon.png'
            rel='apple-touch-icon'
            sizes='180x180'
          />
          <link
            href='/static/favicons/favicon-32x32.png'
            rel='icon'
            sizes='32x32'
            type='image/png'
          />
          <link
            href='/static/favicons/favicon-16x16.png'
            rel='icon'
            sizes='16x16'
            type='image/png'
          />
          <link
            color='#4a9885'
            href='/static/favicons/safari-pinned-tab.svg'
            rel='mask-icon'
          />
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link
            rel='preconnect'
            href='https://fonts.gstatic.com'
            crossOrigin='anonymous'
          />
          <link
            href='https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap'
            rel='stylesheet'
          />
          <meta
            content='/static/favicons/browserconfig.xml'
            name='msapplication-config'
          />
          <meta
            name='theme-color'
            content='#ffffff'
            media='(prefers-color-scheme: light)'
          />
          <meta
            name='theme-color'
            content='#171717'
            media='(prefers-color-scheme: dark)'
          />
          {/* eslint-disable-next-line @next/next/no-sync-scripts */}
          <script
            src='https://ap-gateway.mastercard.com/checkout/version/61/checkout.js'
            data-error='errorCallback'
            data-cancel='cancelCallback'
            data-complete='completeCallback'
          ></script>
          {/* eslint-disable-next-line @next/next/no-sync-scripts */}
          <script src='/static/js/script.js'></script>
        </Head>
        <body className='bg-white dark:bg-gray-900'>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument

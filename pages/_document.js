import { Html, Head, Main, NextScript } from 'next/document'

export default function MyDocument() {
  return (
    <Html>
      <Head>
     
      <meta name="description" content="Created by Code the Dream Labs" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="manifest" href="/manifest.json" />
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap"/>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
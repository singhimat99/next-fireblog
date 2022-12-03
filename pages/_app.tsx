import '../styles/globals.css'
import type { AppProps } from 'next/app'

//MAIN ENTRY POINT FOR ANY PAGE IN THE APP/ WRAPS EVERYTHING

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from '../components/Navbar'
import { Toaster } from 'react-hot-toast'

//MAIN ENTRY POINT FOR ANY PAGE IN THE APP/ WRAPS EVERYTHING

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <Toaster />
    </>
  )
}

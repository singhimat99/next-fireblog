import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Loader from '../components/Loader'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div >
      <Link href={{
        pathname: "/[username]",
        query: {
          username: "himat123"
        } 
      }
      }>Himats Profile</Link>
      <Loader show={true}/>
    </div>
  )
}

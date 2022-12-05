
import Link from 'next/link'
import Loader from '../components/Loader'
import toast  from 'react-hot-toast'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div >
      <button onClick={() => toast.success('hello toast')}>
        Toast Me
      </button>
      <Loader show={true}/>
    </div>
  )
}

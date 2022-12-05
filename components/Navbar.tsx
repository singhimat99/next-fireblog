import React from 'react'
import Link from 'next/link'

function Navbar(): JSX.Element {
  const user = null;
  const username = null;
  
  return (
    <nav className='navbar'>
      <ul>
        <li>
          <Link href='/'>
            <button>FEED</button>
          </Link>
        </li>
        {/* user is signed in and has username */}
        {
          username && (
            <>
              <li className="push-left">
                <Link href="/admin">
                  <button className="btn-blue">Write Posts</button>
                </Link>
              </li>
              <li>
                <Link href={`'${username}`}>
                  <img src='#' alt="TODO: add photoURL"/>
                  {/* insert user.pohotoURL here later */}
                </Link>
              </li>
            </>
          )
        }

        {/* user is not signed OR has not created username */}
        {!username && (
          <li>
            <Link href="/enter">
              <button className="btn-blue">Log in</button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default Navbar
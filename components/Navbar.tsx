import React from 'react'
import Link from 'next/link'
import { useContext } from 'react';
import { UserContext } from '../lib/context';

function Navbar(): JSX.Element {
  const {user, username} = useContext(UserContext)
  
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
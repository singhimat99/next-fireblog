import React, {useContext, useEffect, useState, useCallback, ChangeEvent} from 'react'
import { signInWithPopup } from "firebase/auth"
import {writeBatch, doc, getDoc} from "firebase/firestore"
import { auth, provider, database } from "../lib/firebase"
import googleLogo from "../public/google-logo.png"
import { UserContext } from '../lib/context'
import { useDebounce } from '../lib/hooks'
import debounce from 'lodash.debounce';

export default function EnterPage() {
const {user, username} = useContext(UserContext)
  return (
    <main>
      {
        user ?
          !username ? <UsernameForm /> : <SignOutButton />
          :
          <SignInButton />
      }
    </main>
  )
}

// Sign out button
function SignOutButton() {
  return <button onClick={() => auth.signOut()}>Sign Out</button>;
}

function UsernameForm() {
  const [formValue, setFormValue] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, username } = useContext(UserContext);
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Create refs for both documents
    const userDoc = doc(database, `users/${user.uid}`);
    const usernameDoc = doc(database, `usernames/${formValue}`);

    // Commit both docs together as a batch write.
    const batch = writeBatch(database);
    batch.set(userDoc, { username: formValue, photoURL: user.photoURL, displayName: user.displayName });
    batch.set(usernameDoc, { uid: user.uid });

    await batch.commit();
  };

  
  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
    // Only set form value if length is < 3 OR it passes regex
    if (val.length < 3) {
      setFormValue(val);
      setLoading(false);
      setIsValid(false);
    }
    
    if (re.test(val)) {
      setFormValue(val);
      setLoading(true);
      setIsValid(false);
    }
  }
  
  useEffect(() => {
    checkUsername(formValue)
  }, [formValue]) 

  const checkUsername = useCallback(
    debounce((username) => {
      const handleUsername = async (username: string) => {
        if (username.length >= 3) {
          const ref = doc(database, `usernames`,`${username}`);
          const docRef = await getDoc(ref);
          console.log(docRef.exists())
           console.log('Firestore read executed!');
           setIsValid(!docRef.exists());
           setLoading(false);
         }
       }
       handleUsername(username);
      }
      , 500),
    []
  );
  return (
    !username ? (
      <section>
        <h3>Choose Username</h3>
        <form onSubmit={onSubmit}>
          <input name="username" placeholder="myname" value={formValue} onChange={onChange} />
          <UsernameMessage username={formValue} isValid={isValid} loading={loading} />
          <button type="submit" className="btn-green" disabled={!isValid}>
            Choose
          </button>

          <h3>Debug State</h3>
          <div>
            Username: {formValue}
            <br />
            Loading: {loading.toString()}
            <br />
            Username Valid: {isValid.toString()}
          </div>
        </form>
      </section>
    ) : (
        <></>
    )
  );
}
interface UsernameMsg {
  username: string,
  isValid: boolean,
  loading: boolean
}

function UsernameMessage({ username, isValid, loading }: UsernameMsg) {
  if (loading) {
    return <p>Checking...</p>;
  } else if (isValid) {
    return <p className="text-success">{username} is available!</p>;
  } else if (username && !isValid) {
    return <p className="text-danger">That username is taken!</p>;
  } else {
    return <p></p>;
  }
}
function SignInButton(): JSX.Element {

  async function googleSignIn() {
    try {
      await signInWithPopup(auth, provider);
    } catch (e) {
      console.log(e)
    }
  }


  return (
     <button className="btn-google" onClick={googleSignIn}>
      <img src={`${googleLogo}`} /> Sign in with Google
    </button>
  )
}


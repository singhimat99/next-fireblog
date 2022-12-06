import { auth, database } from '../lib/firebase';
import { useEffect, useState, useRef } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, onSnapshot,  collection } from "firebase/firestore";

// Custom hook to read  auth record and user profile doc
export function useUserData() {
  const [user] = useAuthState(auth);
  // const user = "12"
  const [username, setUsername] = useState(null);

  useEffect(() => {
    // turn off realtime subscription
    let unsubscribe;

    if (user) {
      const ref = doc(database, "users", user.uid);
      unsubscribe = onSnapshot(ref, (doc) => {
        console.log(doc.data())
        setUsername(doc.data()?.username);
      });
    } else {
      setUsername(null);
    }

    return unsubscribe;
  }, [user]);

  return { user, username };
}


export function useDebounce(fn: Function, delay: number) {
  // Use useRef to store the debounce timer
  const timer = useRef<NodeJS.Timeout | null>();

  // The debounce function that will be executed after the delay
  function debounce() {
    // Clear the previous timer
    if (timer.current) {
      clearTimeout(timer.current);
    }

    // Set the new timer
    timer.current = setTimeout(() => {
      // Execute the debounce function
      fn();

      // Clear the timer
      timer.current = null;
    }, delay);
  }

  // Use useEffect to schedule the debounce function for execution
  useEffect(() => {
    debounce();
  });
}
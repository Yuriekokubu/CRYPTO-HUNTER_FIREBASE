// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'xxxxxx',
  authDomain: 'xxxxxx',
  projectId: 'xxxxxx',
  storageBucket: 'xxxxxx',
  messagingSenderId: 'xxxxxx',
  appId: 'xxxxxx',
};

// Initialize Firebase
initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();
export { auth, db };

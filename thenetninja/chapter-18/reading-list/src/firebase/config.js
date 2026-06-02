import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAppTfVf5v_TgZFy5X5gxqBvwkNO_th95w",
    authDomain: "reading-list-97ef2.firebaseapp.com",
    projectId: "reading-list-97ef2",
    storageBucket: "reading-list-97ef2.appspot.com",
    messagingSenderId: "587263026285",
    appId: "1:587263026285:web:ee326d44f2a02324e1cb64"
};

// firebase initialization
initializeApp(firebaseConfig);

// firestore initialization
const db = getFirestore();

// authentication initialization
const auth = getAuth();

export { db, auth };
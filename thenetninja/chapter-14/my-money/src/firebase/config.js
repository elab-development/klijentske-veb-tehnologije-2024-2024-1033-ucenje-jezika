import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBvCAjJTJFOO9CxSBMC65BmnsRBMkvNUeo",
    authDomain: "mymoney-54fc2.firebaseapp.com",
    projectId: "mymoney-54fc2",
    storageBucket: "mymoney-54fc2.appspot.com",
    messagingSenderId: "921064340631",
    appId: "1:921064340631:web:51830342194c8a99ecfdd2"
};

firebase.initializeApp(firebaseConfig);

// services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

// timestamp
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, timestamp };
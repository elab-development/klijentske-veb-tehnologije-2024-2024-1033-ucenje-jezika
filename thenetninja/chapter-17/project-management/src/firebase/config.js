import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBR3EA745MzIDDNALnMbKnQZyRjbak-pkw",
    authDomain: "project-management-3ce2b.firebaseapp.com",
    projectId: "project-management-3ce2b",
    storageBucket: "project-management-3ce2b.appspot.com",
    messagingSenderId: "557156439948",
    appId: "1:557156439948:web:6551acef1568be3ad3a8a9"
};

// firebase initialization
firebase.initializeApp(firebaseConfig);

// services initialization
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();

// timestamp
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, projectStorage, timestamp };
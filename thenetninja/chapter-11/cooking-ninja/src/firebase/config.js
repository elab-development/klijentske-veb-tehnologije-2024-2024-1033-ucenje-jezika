import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD-zJUpmKbTo8QYF_AQDm0ZRyvrNb7oWE8",
    authDomain: "cooking-ninja-site-699bf.firebaseapp.com",
    projectId: "cooking-ninja-site-699bf",
    storageBucket: "cooking-ninja-site-699bf.appspot.com",
    messagingSenderId: "126367341745",
    appId: "1:126367341745:web:2f218f1224c6f027a35690"
};

// initialize firebase
firebase.initializeApp(firebaseConfig);

// initialize services
const projectFirestore = firebase.firestore();

export { projectFirestore }
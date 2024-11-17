import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBi3t0trd0aKZV6X1qWrUfcyVSYR5li9l4",
  authDomain: "typing-test-app-2d074.firebaseapp.com",
  projectId: "typing-test-app-2d074",
  storageBucket: "typing-test-app-2d074.appspot.com",
  messagingSenderId: "105987853388",
  appId: "1:105987853388:web:530e06023ff49653aaf8e9",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebaseApp.auth();
const db = firebaseApp.firestore();

export { auth, db };

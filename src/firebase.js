import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
 


const firebaseConfig = {
  apiKey: "AIzaSyDVaqj7HYXuXNt_ac4i6rU-e9biwsoqbDQ",
  authDomain: "cart-62a4e.firebaseapp.com",
  projectId: "cart-62a4e",
  storageBucket: "cart-62a4e.appspot.com",
  messagingSenderId: "991551718630",
  appId: "1:991551718630:web:ef6704bcfff760fe5d6727"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
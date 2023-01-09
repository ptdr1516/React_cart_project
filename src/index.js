import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'firebase/firestore';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDVaqj7HYXuXNt_ac4i6rU-e9biwsoqbDQ",
  authDomain: "cart-62a4e.firebaseapp.com",
  projectId: "cart-62a4e",
  storageBucket: "cart-62a4e.appspot.com",
  messagingSenderId: "991551718630",
  appId: "1:991551718630:web:ef6704bcfff760fe5d6727"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);



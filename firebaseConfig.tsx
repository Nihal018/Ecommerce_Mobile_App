// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAoKqptcX_OMYrfdum7r9He6bBV4xeJaL8",
  authDomain: "ecommerceapp-42362.firebaseapp.com",
  databaseURL:
    "https://ecommerceapp-42362-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ecommerceapp-42362",
  storageBucket: "ecommerceapp-42362.appspot.com",
  messagingSenderId: "19011265298",
  appId: "1:19011265298:web:af5fe676bd474c6c8c09cb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

export { database };
export { auth };

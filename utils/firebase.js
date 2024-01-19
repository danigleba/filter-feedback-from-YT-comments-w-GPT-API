import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDrxdop69sGquXKD8VYjuPYT3x1Pc3G8ZE",
  authDomain: "feedby-danigleba.firebaseapp.com",
  projectId: "feedby-danigleba",
  storageBucket: "feedby-danigleba.appspot.com",
  messagingSenderId: "98712061437",
  appId: "1:98712061437:web:ec6959c0c7439fa34b8594"
}

const app =  initializeApp(firebaseConfig)
const db = getFirestore(app);

export { db }

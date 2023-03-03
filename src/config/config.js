// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKljAbv0ccN9Qss0GIp8By9qJmBz3-dsQ",
  authDomain: "hungerhalt-84255.firebaseapp.com",
  projectId: "hungerhalt-84255",
  storageBucket: "hungerhalt-84255.appspot.com",
  messagingSenderId: "667757014101",
  appId: "1:667757014101:web:a24ce63b1eeb03b52f38dc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

export {firebaseConfig, app, db, storage};
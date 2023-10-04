// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWD2dtuAwWi-mU-PnIcqLHHR-vPqzdOjg",
  authDomain: "notadex-cb66b.firebaseapp.com",
  projectId: "notadex-cb66b",
  storageBucket: "notadex-cb66b.appspot.com",
  messagingSenderId: "57174439551",
  appId: "1:57174439551:web:6387b5542e8314da1b714a"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);

export default appFirebase;
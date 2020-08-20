import firebase from "firebase/app";
import "firebase/firestore";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBhxgJmqkaPH9_B04VJtXEkSsaVtJbFtDI",
  authDomain: "currency-converter-32f51.firebaseapp.com",
  databaseURL: "https://currency-converter-32f51.firebaseio.com",
  projectId: "currency-converter-32f51",
  storageBucket: "currency-converter-32f51.appspot.com",
  messagingSenderId: "545204953343",
  appId: "1:545204953343:web:294de1e6417964343cecca",
  measurementId: "G-ZXCKY498Q5",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;

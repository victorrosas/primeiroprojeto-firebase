import firebase from "firebase/app";
import 'firebase/database';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA6Y_VG9Ta-cNc-L_elKEX-Hc62niE8p8c",
  authDomain: "meuapp-eddc5.firebaseapp.com",
  projectId: "meuapp-eddc5",
  storageBucket: "meuapp-eddc5.appspot.com",
  messagingSenderId: "115618451210",
  appId: "1:115618451210:web:8ddfa6711f37ba0d40f4f3",
  measurementId: "G-QHS5N6XV74"
};

if(!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
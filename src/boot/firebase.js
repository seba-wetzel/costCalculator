import firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";

// Agregar configuración firebase:
const firebaseConfig = {
      apiKey: "AIzaSyAfvOtB5iYq-2AHKcGbH95Banw93TRKCn4",
      authDomain: "cost-calculator-3ae3c.firebaseapp.com",
      databaseURL: "https://cost-calculator-3ae3c.firebaseio.com",
      projectId: "cost-calculator-3ae3c",
      storageBucket: "cost-calculator-3ae3c.appspot.com",
      messagingSenderId: "980660684013",
      appId: "1:980660684013:web:2b902d531fc16dba2df8e4",
      measurementId: "G-5X2GHLPD0J"
    };

let firebaseApp = firebase.initializeApp(firebaseConfig)
let firebaseAuth = firebaseApp.auth()
let db = firebase.firestore();
let provider = new firebase.auth.GoogleAuthProvider();
export { firebaseAuth, db, provider }
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCDagJfzlO375PQp39KSqhJXpD7fzFb-z4",
  authDomain: "crud-a0581.firebaseapp.com",
  projectId: "crud-a0581",
  storageBucket: "crud-a0581.appspot.com",
  messagingSenderId: "391932453697",
  appId: "1:391932453697:web:f18dc214cec83e6dd9f7c0",
  measurementId: "G-4J9G0ZPPPM"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

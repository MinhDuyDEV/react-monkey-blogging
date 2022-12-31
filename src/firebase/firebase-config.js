import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDVYSOsqsS7OZvaFWMNPFHTDaZGXPDZWhU",
  authDomain: "monkey-blogging-bc22f.firebaseapp.com",
  projectId: "monkey-blogging-bc22f",
  storageBucket: "monkey-blogging-bc22f.appspot.com",
  messagingSenderId: "400511318342",
  appId: "1:400511318342:web:c9467e68d22ddb71b28d47",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

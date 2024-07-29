import { getApps, getApp, initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "linkedin-clone-d8d15.firebaseapp.com",
  projectId: "linkedin-clone-d8d15",
  storageBucket: "linkedin-clone-d8d15.appspot.com",
  messagingSenderId: "67554998688",
  appId: "1:67554998688:web:c5114f434edafaaef48cc5"
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
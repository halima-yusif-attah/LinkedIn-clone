import { getApps, getApp, initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyBwfkawex-loSYoAB-c15JhjRJfl6dQ98k",
  authDomain: "linkedin-clone-2-bc3d7.firebaseapp.com",
  projectId: "linkedin-clone-2-bc3d7",
  storageBucket: "linkedin-clone-2-bc3d7.appspot.com",
  messagingSenderId: "107967880776",
  appId: "1:107967880776:web:d9f9f7d4ac1798e8b8827d"
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
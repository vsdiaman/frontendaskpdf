// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore"; // Se você usar o Firestore
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB7FDie_3xvYvzRFn2kh12qK0O_44p51ZY",
  authDomain: "zingchat-89423.firebaseapp.com",
  projectId: "zingchat-89423",
  storageBucket: "zingchat-89423.appspot.com",
  messagingSenderId: "851970373865",
  appId: "1:851970373865:web:d4c85e657349729a115878",
  measurementId: "G-8Q8KE7Z340",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
export const storage = getStorage(app);
export const firestore = getFirestore(app);

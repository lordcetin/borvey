import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

export const firebaseConfig = {
  apiKey: "AIzaSyAOTdQMFGP6LiOk5QDPBdQSK5zJ8rJvQPs",
  authDomain: "borvey-500c0.firebaseapp.com",
  projectId: "borvey-500c0",
  storageBucket: "borvey-500c0.appspot.com",
  messagingSenderId: "87157054955",
  appId: "1:87157054955:web:95d263af15e676ca2bcdae",
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
auth.languageCode = 'tr';
import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyDec2faP8WJAMy09vh19tjXw-5XkXBa_WM",
  authDomain: "todo-app-souvik.firebaseapp.com",
  projectId: "todo-app-souvik",
  storageBucket: "todo-app-souvik.appspot.com",
  messagingSenderId: "389169792904",
  appId: "1:389169792904:web:8aa692eb6abae639831c3d",
  measurementId: "G-EX3YV29CB7"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// ✅ Enable persistent Auth using AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Firestore
const db = getFirestore(app);

export { auth, db };

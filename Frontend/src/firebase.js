import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBD5ifL8zRZIDmGoW0UqUrumXJCoN4E0TI",
  authDomain: "netflix-clone-87d0b.firebaseapp.com",
  projectId: "netflix-clone-87d0b",
  storageBucket: "netflix-clone-87d0b.firebasestorage.app",
  messagingSenderId: "60229607245",
  appId: "1:60229607245:web:2733f30998e7dfab842104",
  measurementId: "G-YBX18F5QD6",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

const logout = () => {
  signOut(auth);
};

export { auth, db, signup, login, logout };

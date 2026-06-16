import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

import {
  addDoc,
  getFirestore,
  collection,
} from "firebase/firestore";

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

export const auth = getAuth(app);
export const db = getFirestore(app);

export const signup = async (
  name,
  email,
  password
) => {

  const res =
    await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

  const user = res.user;

  await updateProfile(user, {
    displayName: name,
  });

  await addDoc(
    collection(db, "users"),
    {
      uid: user.uid,
      name,
      email,
      authProvider: "local",
    }
  );

  return user;
};

export const login = async (
  email,
  password
) => {

  const res =
    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

  return res.user;
};

export const logout = async () => {
  await signOut(auth);
};
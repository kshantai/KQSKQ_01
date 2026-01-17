import React, { useEffect } from "react";
import { auth, db } from "./firebase";
import Wireframes from "./Wireframes";

export default function App() {
  useEffect(() => {
    // Quick sanity logs (safe to remove later)
    console.log("Firebase auth:", auth);
    console.log("Firestore db:", db);
  }, []);

  return <Wireframes />;
}

import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";
import SalaCard from "./SalaCard";

export default function Salas() {
  const [salas, setSalas] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "salas"), (snapshot) => {
      const lista = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSalas(lista);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Salas</h1>
      <div className="grid gap-4">
        {salas.map((sala) => (
          <SalaCard key={sala.id} sala={sala} />
        ))}
      </div>
    </div>
  );
}

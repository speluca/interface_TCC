import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig"; // usa a instância de auth correta
import { getUserData } from "./auth";

import Admin from "./components/Admin";
import Hub from "./components/Hub";
import Login from "./components/Login";
import Header from "./components/Header";

export default function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);

        // Busca dados extras do Firestore
        const userData = await getUserData(firebaseUser.uid);
        setRole(userData?.role || "aluno");
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Carregando...</p>;
  }

  // 🔹 Se não estiver logado → tela de login
  if (!user) return <Login onLogin={setUser} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900">
  <Header />
  <main className="p-4">
    {role === "admin" ? <Admin /> : <Hub />}
  </main>
</div>

  );
}

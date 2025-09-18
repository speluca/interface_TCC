import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { app } from "./firebaseConfig"; // importa a instância do firebase

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db }; // 🔹 agora pode ser importado em outros arquivos

// Função de cadastro
export async function registerUser(email, password, nome, perfilBartle, role = "aluno") {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      nome,
      email,
      perfilBartle,
      role,
      criadoEm: new Date().toISOString()
    });

    return user;
  } catch (error) {
    console.error("Erro no cadastro:", error);
    throw error;
  }
}

// Função de login
export async function loginUser(email, password) {
  return await signInWithEmailAndPassword(auth, email, password);
}

// Função de logout
export async function logoutUser() {
  return await signOut(auth);
}

// Buscar dados extras do Firestore
export async function getUserData(uid) {
  const docRef = doc(db, "users", uid);
  const snap = await getDoc(docRef);
  if (snap.exists()) {
    return snap.data();
  } else {
    return null;
  }
}

import { useState } from "react";
import { registerUser } from "../auth";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nome, setNome] = useState("");
  const [perfil, setPerfil] = useState("explorador"); // default

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerUser(email, password, nome, perfil);
      alert("Usuário cadastrado com sucesso!");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleRegister} className="space-y-4">
      <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} className="border p-2 rounded w-full" />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2 rounded w-full" />
      <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-2 rounded w-full" />

      <select value={perfil} onChange={(e) => setPerfil(e.target.value)} className="border p-2 rounded w-full">
        <option value="explorador">Explorador</option>
        <option value="conquistador">Conquistador</option>
        <option value="socializador">Socializador</option>
        <option value="assassino">Assassino</option>
      </select>

      <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded">
        Cadastrar
      </button>
    </form>
  );
}

import { useState } from "react";
import { db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import { Gamepad2, Search } from "lucide-react";

export default function Hub() {
  const [room, setRoom] = useState("");
  const [link, setLink] = useState("");

  const loadRoomLink = async () => {
    try {
      const docRef = doc(db, "rooms", room);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const url = docSnap.data().url;
        setLink(url);
        console.log("🔗 Link carregado:", url);
      } else {
        console.log("⚠️ Nenhum link encontrado para essa sala.");
        setLink("");
      }
    } catch (error) {
      console.error("❌ Erro ao carregar link:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 via-pink-400 to-yellow-300 p-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-lg text-center"
      >
        {/* Título divertido */}
        <h1 className="text-3xl font-extrabold text-purple-700 flex justify-center items-center gap-2">
          <Gamepad2 size={32} /> Hub Gamificado
        </h1>
        <p className="text-gray-600 mt-2">Digite o nome da sala para entrar no jogo</p>

        {/* Input estilizado */}
        <div className="mt-6 flex gap-2">
          <input
            className="flex-1 border-2 border-purple-400 focus:ring-2 focus:ring-purple-500 rounded-xl p-3 text-lg outline-none shadow-inner"
            type="text"
            placeholder="Ex: explorador"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-5 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg"
            onClick={loadRoomLink}
          >
            <Search size={20} /> Carregar
          </motion.button>
        </div>

        {/* Exibição do link */}
        {link && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 bg-green-100 border border-green-300 rounded-xl p-4 shadow-inner"
          >
            <p className="font-semibold text-green-800">Link da sala:</p>
            <a
              href={link}
              target="_blank"
              className="text-blue-600 font-bold underline break-words"
            >
              {link}
            </a>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

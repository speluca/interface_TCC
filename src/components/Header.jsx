import { motion } from "framer-motion";
import { Gamepad2, LogOut } from "lucide-react";
import { logoutUser } from "../auth";

export default function Header() {
  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg rounded-b-3xl p-4 flex flex-col md:flex-row items-center justify-between gap-4"
    >
      {/* Logo / Título */}
      <h1 className="text-3xl font-extrabold tracking-wide flex items-center gap-2 drop-shadow-md">
        <Gamepad2 size={32} className="text-yellow-300" />
        Mundo da Matemática
      </h1>

      {/* Botão de Logout */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={logoutUser}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl font-bold shadow-md flex items-center gap-2 transition"
      >
        <LogOut size={18} /> Logout
      </motion.button>
    </motion.header>
  );
}

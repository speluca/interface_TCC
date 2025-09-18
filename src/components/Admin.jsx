import { useState } from "react";
import { db } from "../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Admin() {
  const [room, setRoom] = useState("");
  const [link, setLink] = useState("");

  const saveRoomLink = async () => {
    try {
      await setDoc(doc(db, "rooms", room), { url: link });
      console.log("✅ Link salvo com sucesso:", link);
      alert("Link salvo no Firebase!");
      setRoom("");
      setLink("");
    } catch (error) {
      console.error("❌ Erro ao salvar:", error);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Card className="w-full max-w-md shadow-2xl rounded-2xl border border-slate-700 bg-slate-800/80 backdrop-blur-md">
        <CardContent className="p-6 space-y-6">
          <h1 className="text-2xl font-bold text-center text-white">
            Painel Admin
          </h1>
          <div className="space-y-4">
            <Input
              className="bg-slate-900/50 text-white border-slate-600"
              type="text"
              placeholder="Nome da Sala (ex: explorador)"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
            />
            <Input
              className="bg-slate-900/50 text-white border-slate-600"
              type="text"
              placeholder="Link do Jogo"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
            <Button
              onClick={saveRoomLink}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl"
            >
              Salvar Link
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

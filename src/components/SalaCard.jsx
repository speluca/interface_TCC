import React from "react";

export default function SalaCard({ sala, onEdit }) {
  return (
    <div className="p-4 bg-white shadow rounded-2xl flex justify-between items-center">
      <span className="font-bold">{sala.nome}</span>
      <div className="flex gap-2">
        <a
          href={sala.link}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Entrar
        </a>
        {onEdit && (
          <button
            onClick={() => onEdit(sala)}
            className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
          >
            Editar
          </button>
        )}
      </div>
    </div>
  );
}

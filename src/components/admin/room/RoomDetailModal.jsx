import React from "react";
import Modal from "../Modal";

const typeColors = {
  simplex: "bg-yellow-100 text-yellow-800",
  duplex: "bg-green-100 text-green-800",
  deluxe: "bg-blue-100 text-blue-800",
  suite: "bg-purple-100 text-purple-800"
};

const statusColors = {
  available: "bg-emerald-100 text-emerald-800",
  occupied: "bg-indigo-100 text-indigo-800",
  maintenance: "bg-orange-100 text-orange-800",
  reserved: "bg-pink-100 text-pink-800"
};

const typeLabels = {
  simplex: "Simplex",
  duplex: "Duplex",
  deluxe: "Deluxe",
  suite: "Suite"
};

const statusLabels = {
  available: "Disponible",
  occupied: "Ocupada",
  maintenance: "Mantenimiento",
  reserved: "Reservada"
};

const RoomDetailModal = ({ isOpen, onClose, room }) => {
  if (!room) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="relative bg-white p-6 rounded-2xl shadow-2xl max-w-2xl w-full mx-auto">
        <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
          Detalles de la habitación
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Detalles a la izquierda en desktop */}
          <div className="md:col-span-2 flex flex-col justify-center">
            <h3 className="text-3xl font-extrabold text-indigo-700 mb-2 text-center md:text-left">
              Habitación #{room.number}
            </h3>
            <div className="flex gap-2 mb-4 justify-center md:justify-start">
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${typeColors[room.type] || "bg-gray-100 text-gray-700"}`}>
                {typeLabels[room.type] || room.type}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusColors[room.status] || "bg-gray-100 text-gray-700"}`}>
                {statusLabels[room.status] || room.status}
              </span>
            </div>
            <ul className="w-full text-base text-gray-700 space-y-3 bg-white/80 rounded-xl p-6 shadow">
              <li>
                <span className="font-semibold text-gray-600">Precio:</span>{" "}
                <span className="text-indigo-700 font-bold text-lg">${room.price}</span>
              </li>
              <li>
                <span className="font-semibold text-gray-600">Capacidad:</span>{" "}
                <span>{room.capacity} {room.capacity === 1 ? "persona" : "personas"}</span>
              </li>
              <li>
                <span className="font-semibold text-gray-600">Piso:</span>{" "}
                <span>{room.floor}</span>
              </li>
              {room.description && (
                <li>
                  <span className="font-semibold text-gray-600">Descripción:</span>{" "}
                  <span className="italic text-gray-500">{room.description}</span>
                </li>
              )}
            </ul>
          </div>
          {/* Imagen a la derecha en desktop, arriba en mobile */}
          <div className="flex flex-col items-center md:items-end order-1 md:order-2">
            {room.img && (
              <img
                src={room.img}
                alt={`Habitación ${room.number}`}
                className="max-w-xs w-full h-48 object-cover rounded-xl border border-indigo-200 shadow-lg mb-2"
              />
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default RoomDetailModal;

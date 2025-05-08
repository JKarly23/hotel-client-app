import React from "react";
import Modal from "../Modal";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const roleColors = {
  user: "bg-blue-100 text-blue-800",
  admin: "bg-purple-100 text-purple-800",
  receptionist: "bg-green-100 text-green-800"
};

const roleLabels = {
  user: "Usuario",
  admin: "Administrador",
  receptionist: "Recepcionista"
};

const UserDetailModal = ({ isOpen, onClose, user }) => {
  if (!user) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="relative bg-white p-6 rounded-2xl shadow-2xl max-w-2xl w-full mx-auto">
        <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
          Detalles del usuario
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Información principal */}
          <div className="md:col-span-2 flex flex-col justify-center">
            <h3 className="text-3xl font-extrabold text-indigo-700 mb-2 text-center md:text-left">
              {user.name}
            </h3>
            <div className="flex gap-2 mb-4 justify-center md:justify-start">
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${roleColors[user.role] || "bg-gray-100 text-gray-700"}`}>
                {roleLabels[user.role] || user.role}
              </span>
            </div>
            <ul className="w-full text-base text-gray-700 space-y-3 bg-white/80 rounded-xl p-6 shadow">
              <li>
                <span className="font-semibold text-gray-600">Correo:</span>{" "}
                <span className="text-indigo-700 font-medium">{user.email}</span>
              </li>
              <li>
                <span className="font-semibold text-gray-600">País:</span>{" "}
                <span>{user.country}</span>
              </li>
              <li>
                <span className="font-semibold text-gray-600">Teléfono:</span>{" "}
                <span>{user.phoneNumber}</span>
              </li>
              <li>
                <span className="font-semibold text-gray-600">Fecha de nacimiento:</span>{" "}
                <span>{format(new Date(user.birthDate), "PPP", { locale: es })}</span>
              </li>
              <li>
                <span className="font-semibold text-gray-600">Último ingreso:</span>{" "}
                <span>{format(new Date(user.lastLogin), "PPPpp", { locale: es })}</span>
              </li>
              <li>
                <span className="font-semibold text-gray-600">Última salida:</span>{" "}
                <span>{format(new Date(user.lastLogout), "PPPpp", { locale: es })}</span>
              </li>
              <li>
                <span className="font-semibold text-gray-600">Registrado:</span>{" "}
                <span>{format(new Date(user.created_at), "PPPpp", { locale: es })}</span>
              </li>
            </ul>
          </div>
          {/* Imagen a la derecha */}
          <div className="flex flex-col items-center md:items-end order-1 md:order-2">
            {user.img && (
              <img
                src={user.img}
                alt={`Foto de ${user.name}`}
                className="max-w-xs w-full h-48 object-cover rounded-xl border border-indigo-200 shadow-lg mb-2"
              />
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UserDetailModal;

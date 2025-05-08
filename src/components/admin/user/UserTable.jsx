import React from 'react';
import { useSelector } from 'react-redux';

const statusColors = {
  admin: "bg-yellow-100 text-yellow-800",
  user: "bg-green-100 text-green-800",
  recepcionist: "bg-red-100 text-red-800",
};

const UserTable = () => {
  const { users } = useSelector((state) => state.auth);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 via-indigo-100 to-violet-150 p-4 md:p-10 shadow-2xl">
      <div className="bg-white/90 rounded-3xl shadow-xl p-6 overflow-x-auto">
        <h2 className="text-2xl font-bold text-indigo-700 mb-6 flex items-center gap-3">
          <svg className="w-12 h-12 text-emerald-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 48 48">
            <circle cx="24" cy="18" r="8" fill="#10b981" opacity="0.15" />
            <circle cx="24" cy="18" r="8" stroke="#10b981" strokeWidth="2" />
            <rect x="10" y="30" width="28" height="10" rx="5" fill="#10b981" opacity="0.15" />
            <rect x="10" y="30" width="28" height="10" rx="5" stroke="#10b981" strokeWidth="2" />
          </svg>
          Usuarios
        </h2>
        <table className="min-w-full divide-y divide-indigo-200">
          <thead>
            <tr className="bg-indigo-100">
              <th className="px-4 py-3 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">Id</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">Nombre</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">Email</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">País</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">Nacimiento</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">Teléfono</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">Role</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">No Reservas</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-indigo-100">
            {users.map((b, idx) => (
              <tr key={b.id} className="hover:bg-indigo-50 transition">
                <td className="px-4 py-3 font-bold text-indigo-600">{b.id}</td>
                <td className="px-4 py-3 flex items-center gap-2">
                  <img src={b.img} alt={b.name} className="w-8 h-8 rounded-full object-cover border-2 border-indigo-300" />
                  <span className="font-medium text-gray-700">{b.name}</span>
                </td>
                <td className="px-4 py-3 text-gray-600">{b.email}</td>
                <td className="px-4 py-3 text-gray-600">{b.country}</td>
                <td className="px-4 py-3 text-gray-600">{new Date(b.birthDate).toLocaleDateString()}</td>
                <td className="px-4 py-3 text-indigo-700 font-semibold">{b.phoneNumber}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${statusColors[b.role] || "bg-gray-100 text-gray-700"}`}>
                    {b.role === "admin" ? "Administrador" : b.role === "user" ? "Usuario" : "Recepcionista"}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-600">{b.bookings.length}</td>
                <td className="px-4 py-3 flex gap-2">
                  <button className="p-2 rounded-full bg-indigo-100 hover:bg-indigo-200 text-indigo-700 transition" title="Editar">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15.232 5.232l3.536 3.536M9 13l6-6 3 3-6 6H9v-3z" /></svg>
                  </button>
                  <button className="p-2 rounded-full bg-pink-100 hover:bg-pink-200 text-pink-700 transition" title="Eliminar">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 19a2 2 0 002 2h8a2 2 0 002-2V7H6v12zM19 7V5a2 2 0 00-2-2H7a2 2 0 00-2 2v2" /></svg>
                  </button>
                  <button className="p-2 rounded-full bg-emerald-100 hover:bg-emerald-200 text-emerald-700 transition" title="Ver detalles">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" /><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="text-xs text-gray-400 mt-2 md:hidden text-center">Desliza la tabla para ver más columnas</div>
      </div>
    </div >
  );
};

export default UserTable;

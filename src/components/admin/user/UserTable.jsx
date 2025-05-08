import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import UserEditModal from './UserEditModal';
import UserDeleteModal from './UserDeleteModal';
import UserDetailModal from './UserDetailModal';
import ExportButton from '../ExportButton';

const roleColors = {
  admin: "bg-yellow-100 text-yellow-800",
  user: "bg-green-100 text-green-800",
  recepcionist: "bg-red-100 text-red-800",
};
const PAGE_SIZE = 8;

const exportColumns = [
  { key: "name", label: "Nombre" },
  { key: "email", label: "Email" },
  { key: "country", label: "País" },
  { key: "phoneNumber", label: "Teléfono" },
  { key: "role", label: "Rol" },
  { key: "bookings", label: "Cantidad de Reservas" },
];



const UserTable = () => {
  const { user } = useSelector((state) => state.auth)
  const { users } = useSelector((state) => state.auth);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalType, setModalType] = useState(null); // "edit" | "delete" | "detail"
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const openModal = (type, user = null) => {
    setSelectedUser(user);
    setModalType(type);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setModalType(null);
  };

  const filteredUsers = useMemo(() => {
    if (!search) return users;
    const s = search.toLowerCase();
    return users.filter(
      (u) =>
        u.name?.toLowerCase().includes(s) ||
        u.email?.toLowerCase().includes(s) ||
        u.role?.toLowerCase().includes(s) ||
        u.country?.toLowerCase().includes(s)
    );
  }, [users, search]);

  const exportData = filteredUsers.map(u => ({
    ...u,
    role: u.role === "admin" ? "Administrador" : u.role === "user" ? "Usuario" : "Recepcionista",
    bookings: u.bookings?.length || 0
  }));

  const totalPages = Math.ceil(filteredUsers.length / PAGE_SIZE);
  const paginatedUsers = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredUsers.slice(start, start + PAGE_SIZE);
  }, [filteredUsers, page]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) setPage(newPage);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 via-indigo-100 to-violet-150 p-4 md:p-10 shadow-2xl">
      <div className="bg-white/90 rounded-3xl shadow-xl p-6 overflow-x-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

          <h2 className="text-2xl font-bold text-indigo-700 flex items-center gap-3">
            <svg className="w-12 h-12 text-emerald-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 48 48">
              <circle cx="24" cy="18" r="8" fill="#10b981" opacity="0.15" />
              <circle cx="24" cy="18" r="8" stroke="#10b981" strokeWidth="2" />
              <rect x="10" y="30" width="28" height="10" rx="5" fill="#10b981" opacity="0.15" />
              <rect x="10" y="30" width="28" height="10" rx="5" stroke="#10b981" strokeWidth="2" />
            </svg>
            Usuarios
          </h2>

          <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="search"
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
                placeholder="Buscar por nombre, email, país, rol..."
                className="pl-10 pr-4 py-2.5 w-full text-sm text-gray-700 bg-white/50 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-200 transition duration-200"
              />
            </div>
            <div className="w-full md:w-auto">
              <ExportButton
                data={exportData}
                columns={exportColumns}
                fileName="usuarios"
                format="xlsx"
                className="w-full md:w-auto"
              />
            </div>
          </div>
        </div>

        <table className="min-w-full divide-y divide-indigo-200">
          <thead>
            <tr className="bg-indigo-100">
              <th className="px-4 py-3 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">#</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">Nombre</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">Email</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">País</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">Teléfono</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">Rol</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider"># Reservas</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-indigo-100">
            {paginatedUsers.map((u, idx) => (
              <tr key={u.id} className="hover:bg-indigo-50 transition">
                <td className="px-4 py-3 text-gray-400">{(page - 1) * PAGE_SIZE + idx + 1}</td>
                <td className="px-4 py-3 flex items-center gap-2">
                  <img src={u.img ? u.img :
                    'https://tse4.mm.bing.net/th/id/OIP.FkQDxKdriMvRdcRm9X7ZFAHaHX?cb=iwp1&rs=1&pid=ImgDetMain'
                  } alt={u.name} className="w-8 h-8 rounded-full object-cover border-2 border-indigo-300" />
                  <span className="font-medium text-gray-700">{u.name}</span>
                </td>
                <td className="px-4 py-3 text-gray-600">{u.email}</td>
                <td className="px-4 py-3 text-gray-600">{u.country}</td>
                <td className="px-4 py-3 text-indigo-700 font-semibold">{u.phoneNumber}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${roleColors[u.role] || "bg-gray-100 text-gray-700"}`}>
                    {u.role === "admin" ? "Administrador" : u.role === "user" ? "Usuario" : "Recepcionista"}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-600">{u.bookings?.length || 0}</td>
                <td className="px-4 py-3 flex gap-2">
                  <button
                    onClick={() => openModal("detail", u)}
                    className="p-2 rounded-full bg-emerald-100 hover:bg-emerald-200 text-emerald-700 transition"
                    title="Ver detalles"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="3" />
                      <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                  {user.role === 'admin' && (
                    <>
                      <button
                        onClick={() => openModal("edit", u)}
                        className="p-2 rounded-full bg-indigo-100 hover:bg-indigo-200 text-indigo-700 transition"
                        title="Editar"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M15.232 5.232l3.536 3.536M9 13l6-6 3 3-6 6H9v-3z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => openModal("delete", u)}
                        className="p-2 rounded-full bg-pink-100 hover:bg-pink-200 text-pink-700 transition"
                        title="Eliminar"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M6 19a2 2 0 002 2h8a2 2 0 002-2V7H6v12zM19 7V5a2 2 0 00-2-2H7a2 2 0 00-2 2v2" />
                        </svg>
                      </button>
                    </>
                  )
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="text-xs text-gray-400 mt-2 md:hidden text-center">Desliza la tabla para ver más columnas</div>

        {/* PAGINACIÓN */}
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className={`px-3 py-1 rounded-lg font-semibold transition ${page === 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'}`}
          >
            Anterior
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-1 rounded-lg font-semibold transition ${page === i + 1 ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'}`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            className={`px-3 py-1 rounded-lg font-semibold transition ${page === totalPages ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'}`}
          >
            Siguiente
          </button>
        </div>
      </div>

      {/* MODALES - Sustituye con tus componentes reales */}
      {modalType === "edit" && <UserEditModal isOpen onClose={closeModal} user={selectedUser} />}
      {modalType === "delete" && <UserDeleteModal isOpen onClose={closeModal} user={selectedUser} />}
      {modalType === "detail" && <UserDetailModal isOpen onClose={closeModal} user={selectedUser} />}
    </div >
  );
};

export default UserTable;

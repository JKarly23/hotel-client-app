import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import RoomCreateModal from './RoomCreateModal';
import RoomEditModal from './RoomEditModal';
import RoomDeleteModal from './RoomDeleteModal';
import RoomDetailModal from './RoomDetailModal';
import { SeedService } from '../../../services/SeedService';
import { useDispatch } from 'react-redux';
import { setRooms } from '../../../feautere/room/roomSlice';
import { handleApiError } from '../../../utils/handleApiError';
import Loader from '../../ui/Loader';
import ErrorMessage from '../../ui/ErrorMessage';
import ExportButton from '../ExportButton';


const statusColors = {
  occupied: "bg-yellow-100 text-yellow-800",
  available: "bg-green-100 text-green-800",
  reserved: "bg-red-100 text-red-800",
  maintenance: "bg-blue-100 text-blue-800",
};

const typeColors = {
  simplex: "bg-yellow-100 text-yellow-800",
  duples: "bg-green-100 text-green-800",
  deluxe: "bg-blue-100 text-blue-800",
  suite: "bg-purple-100 text-purple-800"
};

const bookingStatusLabels = {
  available: 'Available',
  occupied: 'Occupied',
  maintenance: 'Maintenance',
  reserved: 'Reserved',
};

const exportColumns = [
  { key: "number", label: "Número" },
  { key: "price", label: "Precio" },
  { key: "capacity", label: "Capacidad" },
  { key: "floor", label: "Piso" },
  { key: "type", label: "Tipo" },
  { key: "status", label: "Estado" },
];


const PAGE_SIZE = 8;

const seedService = new SeedService();
const RoomTable = () => {

  const { rooms } = useSelector((state) => state.room);
  const dispatch = useDispatch();
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [modalType, setModalType] = useState(null); // "create" | "edit" | "delete" | "detail"
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const openModal = (type, room = null) => {
    setSelectedRoom(room);
    setModalType(type);
  };

  const closeModal = () => {
    setSelectedRoom(null);
    setModalType(null);
  };

  // Filtrado de habitaciones
  const filteredRooms = useMemo(() => {
    if (!search) return rooms;
    const s = search.toLowerCase();
    return rooms.filter(
      (b) =>
        b.number?.toString().includes(s) ||
        b.type?.toLowerCase().includes(s) ||
        b.status?.toLowerCase().includes(s) ||
        b.floor?.toString().includes(s)
    );
  }, [rooms, search]);


  const exportData = filteredRooms.map(d => ({
    ...d,
    type: d.type === 'simplex' ? "Simplex"
      : d.type === 'duples' ? 'Duples'
        : d.type === 'deluxe' ? 'Deluxe'
          : 'Suite',
    status: d.status === 'available' ? "Disponible"
      : d.status === 'occupied' ? 'Ocupada'
        : d.status === 'maintenance' ? 'Mantenimiento'
          : 'Reservada',
  }))

  // Paginación
  const totalPages = Math.ceil(filteredRooms.length / PAGE_SIZE);
  const paginatedRooms = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredRooms.slice(start, start + PAGE_SIZE);
  }, [filteredRooms, page]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) setPage(newPage);
  };

  const runSeed = async () => {
    try {
      setLoading(true);
      const data = await seedService.runSeed();
      if (data.code === 200) {
        dispatch(setRooms(data.rooms))
      }
    } catch (error) {
      setError(handleApiError(error));
    } finally {
      setLoading(false);
    }
  }
  if (loading) return < Loader message={'Ejecutando seed...'} />
  if (error) return <ErrorMessage error={error} />

  return (
    <>
      <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 via-indigo-100 to-violet-150 p-4 md:p-10 shadow-2xl">
        <div className="bg-white/90 rounded-3xl shadow-xl p-6 overflow-x-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h2 className="text-2xl font-bold text-indigo-700 flex items-center gap-3">
              <svg className="w-12 h-12 text-pink-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 48 48">
                <rect x="8" y="10" width="32" height="28" rx="4" fill="#ec4899" opacity="0.15" />
                <rect x="8" y="10" width="32" height="28" rx="4" stroke="#ec4899" strokeWidth="2" />
                <rect x="16" y="18" width="16" height="4" rx="2" fill="#ec4899" />
                <rect x="16" y="26" width="10" height="4" rx="2" fill="#ec4899" opacity="0.7" />
              </svg>
              Habitaciones
            </h2>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="search"
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
                placeholder="Buscar por número, tipo, estado..."
                className="border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition w-full md:w-64"
              />
              <button
                onClick={() => openModal("create")}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2 rounded-xl shadow transition active:scale-95"
              >
                + Nueva
              </button>
              <button
                onClick={() => runSeed()}
                className="bg-green-400 hover:bg-green-500 text-green-900 font-semibold px-5 py-2 rounded-xl shadow transition active:scale-95 flex items-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 6v6m0 0v6m0-6h6m-6 0H6" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Restaurar
              </button>
            </div>
          </div>
          <table className="min-w-full divide-y divide-indigo-200">
            <thead>
              <tr className="bg-indigo-100">
                <th className="px-4 py-3 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">°</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">Id</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">Número</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">Precio</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">Capacidad</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">Piso</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">Tipo</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">Estado</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-indigo-100">
              {paginatedRooms.map((b, idx) => (
                <tr key={b.id} className="hover:bg-indigo-50 transition">
                  <td className="px-4 py-3 text-gray-400 ">{(page - 1) * PAGE_SIZE + idx + 1}</td>
                  <td className="px-4 py-3 flex items-center gap-2 font-bold text-indigo-600">
                    <img src={b.img} alt={b.id} className="w-8 h-8 rounded-full object-cover border-2 border-indigo-300" />
                    <span className="font-medium text-gray-700">{b.id}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-600 ">{b.number}</td>
                  <td className="px-4 py-3  text-gray-700 font-semibold">${b.price}</td>
                  <td className="px-4 py-3 text-gray-600">{b.capacity}</td>
                  <td className="px-4 py-3 text-gray-600 ">{b.floor}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${typeColors[b.type] || "bg-gray-100 text-gray-700"}`}>
                      {b.type === "simplex" ? "Simplex" : b.type === "duples" ? "Duplex" : b.type === 'deluxe' ? 'Deluxe' : 'Suite'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${statusColors[b.status] || "bg-gray-100 text-gray-700"}`}>
                      {bookingStatusLabels[b.status] || b.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 flex gap-2">
                    <button onClick={() => openModal("edit", b)} className="p-2 rounded-full bg-indigo-100 hover:bg-indigo-200 text-indigo-700 transition" title="Editar">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15.232 5.232l3.536 3.536M9 13l6-6 3 3-6 6H9v-3z" /></svg>
                    </button>
                    <button onClick={() => openModal("delete", b)} className="p-2 rounded-full bg-pink-100 hover:bg-pink-200 text-pink-700 transition" title="Eliminar">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 19a2 2 0 002 2h8a2 2 0 002-2V7H6v12zM19 7V5a2 2 0 00-2-2H7a2 2 0 00-2 2v2" /></svg>
                    </button>
                    <button onClick={() => openModal("detail", b)} className="p-2 rounded-full bg-emerald-100 hover:bg-emerald-200 text-emerald-700 transition" title="Ver detalles">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" /><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                    </button>
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
              className={`px-3 py-1 mr-85 rounded-lg font-semibold transition ${page === totalPages ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'}`}
            >
              Siguiente
            </button>
            <ExportButton
              data={exportData}
              columns={exportColumns}
              fileName="habitaciones"
              format="xlsx"
            />
          </div>
        </div>
        {modalType === "create" && <RoomCreateModal isOpen onClose={closeModal} />}
        {modalType === "edit" && <RoomEditModal isOpen onClose={closeModal} room={selectedRoom} />}
        {modalType === "delete" && <RoomDeleteModal isOpen onClose={closeModal} room={selectedRoom} />}
        {modalType === "detail" && <RoomDetailModal isOpen onClose={closeModal} room={selectedRoom} />}
      </div>
    </>
  );
};

export default RoomTable;

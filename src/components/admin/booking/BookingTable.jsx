import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import Loader from '../../ui/Loader';
import ErrorMessage from '../../ui/ErrorMessage';
import BookingDeleteModal from './BookingDeleteModal';
import BookingDetailModal from './BookingDetailModal';
import BookingEditModal from './BookingEditModal';
import ExportButton from '../ExportButton';
import BookingScanner from './BookingScanner';


// Colores y etiquetas de estado
const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  paid: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
  confirmed: "bg-blue-100 text-blue-800",
  checked_in: "bg-emerald-100 text-emerald-800",
  checked_out: "bg-indigo-100 text-indigo-800",
  no_show: "bg-gray-200 text-gray-700"
};

const bookingStatusLabels = {
  pending: "Pendiente",
  confirmed: "Confirmada",
  checked_in: "Check-in",
  checked_out: "Check-out",
  cancelled: "Cancelada",
  no_show: "No show"
};

const PAGE_SIZE = 8;

const exportColumns = [
  { key: "room", label: "Habitación" },
  { key: "user", label: "Usuario" },
  { key: "checkInDate", label: "Check-in" },
  { key: "checkOutDate", label: "Check-out" },
  { key: "totalPrice", label: "Total" },
  { key: "paymentStatus", label: "Pago" },
  { key: "status", label: "Estado" },
];

const BookingTable = () => {
  const { user } = useSelector((state) => state.auth);
  const { bookings } = useSelector((state) => state.booking);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [modalType, setModalType] = useState(null); // "edit" | "delete" | "detail"
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [scannerAction, setScannerAction] = useState('');
  const [showScanner, setShowScanner] = useState(false);

  const openModal = (type, booking = null) => {
    setSelectedBooking(booking);
    setModalType(type);
  };

  const closeModal = () => {
    setSelectedBooking(null);
    setModalType(null);
  };

  // Filtrado de reservas
  const filteredBookings = useMemo(() => {
    if (!search) return bookings;
    const s = search.toLowerCase();
    return bookings.filter(
      (b) =>
        b.room?.number?.toString().includes(s) ||
        b.user?.name?.toLowerCase().includes(s) ||
        b.status?.toLowerCase().includes(s) ||
        b.paymentStatus?.toLowerCase().includes(s||
        new Date(b.checkInDate).toLocaleDateString().toLowerCase().includes(s) ||
        new Date(b.checkOutDate).toLocaleDateString().toLowerCase().includes(s))
    );
  }, [bookings, search]);

  const exportData = filteredBookings.map(d => ({
    ...d,
    room: d.room.number,
    user: d.user.name
  }))

  // Paginación
  const totalPages = Math.ceil(filteredBookings.length / PAGE_SIZE);
  const paginatedBookings = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredBookings.slice(start, start + PAGE_SIZE);
  }, [filteredBookings, page]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) setPage(newPage);
  };

  return (
    <>
      {showScanner && <BookingScanner action={scannerAction} />}
      <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 via-indigo-100 to-violet-150 p-4 md:p-10 shadow-2xl">
        <div className="bg-white/90 rounded-3xl shadow-xl p-6 overflow-x-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h2 className="text-2xl font-bold text-indigo-700 flex items-center gap-3">
              <svg className="w-8 h-8 text-indigo-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" /><path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" /></svg>
              Reservas
            </h2>
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="search"
                  value={search}
                  onChange={e => { setSearch(e.target.value); setPage(1); }}
                  placeholder="Buscar por habitación, usuario, estado..."
                  className="pl-10 w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition shadow-sm hover:shadow-md"
                />
              </div>
              <ExportButton
                data={exportData}
                columns={exportColumns}
                fileName="reservas"
                format="xlsx"
              />
            </div>
            {user.role === 'recepcionist' && (
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setScannerAction("checkin");
                    setShowScanner(true);
                  }}
                  className="flex items-center gap-2 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl transition shadow-sm hover:shadow-md"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Escanear Check-in
                </button>
                <button
                  onClick={() => {
                    setScannerAction("checkout");
                    setShowScanner(true);
                  }}
                  className="flex items-center gap-2 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl transition shadow-sm hover:shadow-md"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Escanear Check-out
                </button>
              </div>
            )}
          </div>
          <table className="min-w-full divide-y divide-indigo-200">
            <thead>
              <tr className="bg-indigo-100">
                <th className="px-4 py-3 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">#</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">Habitación</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">Usuario</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">Check-in</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">Check-out</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">Total</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">Pago</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">Estado</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-indigo-100">
              {paginatedBookings.map((b, idx) => (
                <tr key={b.id} className="hover:bg-indigo-50 transition">
                  <td className="px-4 py-3 text-gray-400">{(page - 1) * PAGE_SIZE + idx + 1}</td>
                  <td className="px-4 py-3 font-bold text-indigo-600">{b.room.number}</td>
                  <td className="px-4 py-3 flex items-center gap-2">
                    <img src={b.img ? b.img :
                      'https://tse4.mm.bing.net/th/id/OIP.FkQDxKdriMvRdcRm9X7ZFAHaHX?cb=iwp1&rs=1&pid=ImgDetMain'
                    } alt={b.user.name} className="w-8 h-8 rounded-full object-cover border-2 border-indigo-300" />
                    <span className="font-medium text-gray-700">{b.user.name}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{b.checkInDate ? new Date(b.checkInDate).toLocaleDateString() :'  ----'}</td>
                  <td className="px-4 py-3 text-gray-600">{b.checkInDate ? new Date(b.checkOutDate).toLocaleDateString(): '  ----'}</td>
                  <td className="px-4 py-3 text-indigo-700 font-semibold">${b.totalPrice ? b.totalPrice : '---'}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${statusColors[b.paymentStatus] || "bg-gray-100 text-gray-700"}`}>
                      {b.paymentStatus ? b.paymentStatus === "pending" ? "Pendiente" : b.paymentStatus === "paid" ? "Pagado" : "Cancelado" : '----'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${statusColors[b.status] || "bg-gray-100 text-gray-700"}`}>
                      {bookingStatusLabels[b.status] || b.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 flex gap-2">
                    <button
                      onClick={() => openModal("detail", b)}
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
                          onClick={() => openModal("edit", b)}
                          className="p-2 rounded-full bg-indigo-100 hover:bg-indigo-200 text-indigo-700 transition"
                          title="Editar"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M15.232 5.232l3.536 3.536M9 13l6-6 3 3-6 6H9v-3z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => openModal("delete", b)}
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
        </div >
        {modalType === "edit" && <BookingEditModal isOpen onClose={closeModal} booking={selectedBooking} />
        }
        {modalType === "delete" && <BookingDeleteModal isOpen onClose={closeModal} booking={selectedBooking} />}
        {modalType === "detail" && <BookingDetailModal isOpen onClose={closeModal} booking={selectedBooking} />}
      </div >
    </>
  );
};

export default BookingTable;

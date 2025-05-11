import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Trash2, Eye, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import DetailBookingUser from "./DetailBookingUser";
import BookingUserCancelled from "./BookingUserCancelled";

const ITEMS_PER_PAGE = 5;

const UserBookingsTable = ({ bookings, back }) => {
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [selected, setSelected] = useState(null);
    const [booking, setBooking] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [room, setRoom] = useState(0);
    const filteredBookings = useMemo(() => {
        return bookings.filter((b) =>
            b.room?.number?.toString().toLowerCase().includes(search.toLowerCase()) ||
            b.status?.toLowerCase().includes(search.toLowerCase())
        );
    }, [bookings, search]);

    const totalPages = Math.ceil(filteredBookings.length / ITEMS_PER_PAGE);
    const paginated = filteredBookings.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handlePrev = () => currentPage > 1 && setCurrentPage(p => p - 1);
    const handleNext = () => currentPage < totalPages && setCurrentPage(p => p + 1);

    const handleDelete = (booking) => {
        setBooking(booking);
        setIsModalOpen(true);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white p-8 rounded-3xl shadow-2xl overflow-x-auto max-w-7xl mx-auto"
        >
            <div className="mt-16 flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Reservas del Usuario
                </h2>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-400" />
                    <input
                        type="text"
                        value={search}
                        onChange={e => {
                            setSearch(e.target.value);
                            setCurrentPage(1);
                        }}
                        placeholder="Buscar habitación o estado..."
                        className="pl-12 pr-4 py-3 rounded-full border-2 border-indigo-100 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-all duration-200 w-full sm:w-64 text-gray-700"
                    />
                </div>
            </div>

            <div className="hidden sm:block rounded-2xl overflow-hidden border border-indigo-100">
                <table className="min-w-full text-sm text-gray-700">
                    <thead>
                        <tr className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                            <th className="py-4 px-6 font-semibold">#</th>
                            <th className="py-4 px-6 font-semibold">Habitación</th>
                            <th className="py-4 px-6 font-semibold">Check-In</th>
                            <th className="py-4 px-6 font-semibold">Check-Out</th>
                            <th className="py-4 px-6 font-semibold">Estado</th>
                            <th className="py-4 px-6 font-semibold">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginated.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center py-8 text-gray-500 bg-gray-50">
                                    No se encontraron reservas.
                                </td>
                            </tr>
                        ) : (
                            paginated.map((booking, index) => (
                                < tr key={booking.id} className="border-b border-indigo-50 hover:bg-indigo-50/30 transition-colors duration-200" >
                                    <td className="py-4 px-6 font-medium">{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</td>
                                    <td className="py-4 px-6">{booking.room.number}</td>
                                    <td className="py-4 px-6">{booking.checkInDate ? format(new Date(booking.checkInDate), "dd/MM/yyyy") : '----'}</td>
                                    <td className="py-4 px-6">{booking.checkOutDate ? format(new Date(booking.checkOutDate), "dd/MM/yyyy") : '----'}</td>
                                    <td className="py-4 px-6">
                                        <span className={`px-4 py-1.5 rounded-full text-xs font-semibold ${booking.status === "CANCELLED"
                                            ? "bg-red-100 text-red-600"
                                            : booking.status === "COMPLETED"
                                                ? "bg-green-100 text-green-600"
                                                : "bg-yellow-100 text-yellow-700"
                                            }`}>
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex gap-4">
                                            <button
                                                title="Ver detalles"
                                                className="text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
                                                onClick={() => setSelected(booking)}
                                            >
                                                <Eye className="w-5 h-5" />
                                            </button>
                                            {booking.status !== "CANCELLED" && (
                                                <button
                                                    title="Cancelar reserva"
                                                    className="text-red-600 hover:text-red-800 transition-colors duration-200"
                                                    onClick={() => handleDelete(booking)}
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Layout tipo tarjeta para móviles */}
            <div className="sm:hidden space-y-4">
                {paginated.length === 0 ? (
                    <p className="text-center text-gray-500 bg-gray-50 py-6 rounded-xl border">No se encontraron reservas.</p>
                ) : (
                    paginated.map((booking, index) => (
                        <div key={booking.id} className="bg-white rounded-xl border border-indigo-100 shadow p-4">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-sm font-semibold text-indigo-600">Reserva #{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</h3>
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${booking.status === "CANCELLED"
                                    ? "bg-red-100 text-red-600"
                                    : booking.status === "COMPLETED"
                                        ? "bg-green-100 text-green-600"
                                        : "bg-yellow-100 text-yellow-700"
                                    }`}>
                                    {booking.status}
                                </span>
                            </div>
                            <p className="text-sm text-gray-700"><strong>Habitación:</strong> {booking.room?.number || "N/A"}</p>
                            <p className="text-sm text-gray-700"><strong>Check-In:</strong> {booking.checkInDate ? format(new Date(booking.checkInDate), "dd/MM/yyyy") : '----'}</p>
                            <p className="text-sm text-gray-700"><strong>Check-Out:</strong> {booking.checkOutDate ? format(new Date(booking.checkOutDate), "dd/MM/yyyy") : '----'}</p>
                            <div className="flex gap-4 mt-4">
                                <button
                                    title="Ver detalles"
                                    className="text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
                                    onClick={() => setSelected(booking)}
                                >
                                    <Eye className="w-5 h-5" />
                                </button>
                                {booking.status !== "CANCELLED" && (
                                    <button
                                        title="Cancelar reserva"
                                        className="text-red-600 hover:text-red-800 transition-colors duration-200"
                                        onClick={() => handleDelete(booking)}
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {
                selected && (
                    <DetailBookingUser selected={selected} setSelected={setSelected} />
                )
            }
            {
                isModalOpen && (
                    <BookingUserCancelled booking={booking} setIsModalOpen={setIsModalOpen} />
                )
            }
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-8">
                    <button
                        onClick={handlePrev}
                        disabled={currentPage === 1}
                        className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <span className="text-sm text-gray-600">
                        Página {currentPage} de {totalPages}
                    </span>
                    <button
                        onClick={handleNext}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            )}
        </motion.div >
    );
};

export default UserBookingsTable;

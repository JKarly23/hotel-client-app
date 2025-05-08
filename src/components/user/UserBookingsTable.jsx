import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Trash2, Eye, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import DetailBookingUser from "./DetailBookingUser";

const ITEMS_PER_PAGE = 5;

const UserBookingsTable = ({ bookings, onCancel, back }) => {
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [selected, setSelected] = useState(null);

    const filteredBookings = useMemo(() => {
        return bookings.filter(b =>
            b.room?.number?.toString().toLowerCase().includes(search.toLowerCase())
        );
    }, [bookings, search]);

    const totalPages = Math.ceil(filteredBookings.length / ITEMS_PER_PAGE);
    const paginated = filteredBookings.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handlePrev = () => currentPage > 1 && setCurrentPage(p => p - 1);
    const handleNext = () => currentPage < totalPages && setCurrentPage(p => p + 1);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white p-6 rounded-3xl shadow-xl overflow-x-auto"
        >
            <div className="mt-20 flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
                <h2 className="text-2xl font-bold text-indigo-700">Reservas del Usuario</h2>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        value={search}
                        onChange={e => {
                            setSearch(e.target.value);
                            setCurrentPage(1);
                        }}
                        placeholder="Buscar habitación..."
                        className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                </div>
            </div>

            <table className="min-w-full text-sm text-gray-700">
                <thead>
                    <tr className="text-left bg-indigo-100 text-indigo-700">
                        <th className="py-3 px-4">#</th>
                        <th className="py-3 px-4">Habitación</th>
                        <th className="py-3 px-4">Check-In</th>
                        <th className="py-3 px-4">Check-Out</th>
                        <th className="py-3 px-4">Estado</th>
                        <th className="py-3 px-4">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {paginated.length === 0 ? (
                        <tr>
                            <td colSpan="6" className="text-center py-6 text-gray-500">
                                No se encontraron reservas.
                            </td>
                        </tr>
                    ) : (
                        paginated.map((booking, index) => (
                            <tr key={booking.id} className="border-b hover:bg-indigo-50 transition">
                                <td className="py-3 px-4 font-medium">
                                    {(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                                </td>
                                <td className="py-3 px-4">{booking.room?.number || "N/A"}</td>
                                <td className="py-3 px-4">{format(new Date(booking.checkInDate), "dd/MM/yyyy")}</td>
                                <td className="py-3 px-4">{format(new Date(booking.checkOutDate), "dd/MM/yyyy")}</td>
                                <td className="py-3 px-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${booking.status === "CANCELLED"
                                        ? "bg-red-100 text-red-600"
                                        : booking.status === "COMPLETED"
                                            ? "bg-green-100 text-green-600"
                                            : "bg-yellow-100 text-yellow-700"
                                        }`}>
                                        {booking.status}
                                    </span>
                                </td>
                                <td className="py-3 px-4 flex gap-3">
                                    <button
                                        title="Ver detalles"
                                        className="text-indigo-600 hover:text-indigo-800"
                                        onClick={() => setSelected(booking)}
                                    >
                                        <Eye className="w-5 h-5" />
                                    </button>
                                    {booking.status !== "CANCELLED" && (
                                        <button
                                            title="Cancelar reserva"
                                            className="text-red-600 hover:text-red-800"
                                            onClick={() => onCancel(booking.id)}
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            <button
                onClick={() => back(false)}
                className="flex items-center gap-2 px-4 py-2 mt-4 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-sm hover:shadow-md"
            >
                <ChevronLeft className="w-4 h-4" />
                Volver al perfil
            </button>

            {/* Paginación */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-6 gap-3">
                    <button
                        onClick={handlePrev}
                        disabled={currentPage === 1}
                        className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full disabled:opacity-50"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="px-4 py-2 text-sm font-medium text-indigo-700">
                        Página {currentPage} de {totalPages}
                    </span>
                    <button
                        onClick={handleNext}
                        disabled={currentPage === totalPages}
                        className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full disabled:opacity-50"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            )}

            {/* Modal de detalle */}
            {selected && (
                <DetailBookingUser selected={selected} setSelected={setSelected} />
            )}
        </motion.div>
    );
};

export default UserBookingsTable;

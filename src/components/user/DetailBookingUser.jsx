import React from 'react'
import { format } from "date-fns";

const DetailBookingUser = ({ selected, setSelected }) => {
    return (
        <div className="fixed inset-0 bg-opacity-250 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full mx-4 transform transition-all">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-indigo-700">Detalle de reserva</h3>
                    <button
                        onClick={() => setSelected(null)}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="space-y-3">
                    <div className="flex items-center">
                        <span className="text-gray-500 w-24">Habitación:</span>
                        <span className="font-medium">{selected.room?.number}</span>
                    </div>
                    <div className="flex items-center">
                        <span className="text-gray-500 w-24">Check-In:</span>
                        <span className="font-medium">{format(new Date(selected.checkInDate), "dd/MM/yyyy")}</span>
                    </div>
                    <div className="flex items-center">
                        <span className="text-gray-500 w-24">Check-Out:</span>
                        <span className="font-medium">{format(new Date(selected.checkOutDate), "dd/MM/yyyy")}</span>
                    </div>
                    <div className="flex items-center">
                        <span className="text-gray-500 w-24">Estado:</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${selected.status === "CANCELLED"
                            ? "bg-red-100 text-red-600"
                            : selected.status === "COMPLETED"
                                ? "bg-green-100 text-green-600"
                                : "bg-yellow-100 text-yellow-700"
                            }`}>
                            {selected.status}
                        </span>
                    </div>
                </div>
                <button
                    className="mt-6 w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                    onClick={() => setSelected(null)}
                >
                    Cerrar
                </button>
            </div>
        </div>
    )
}

export default DetailBookingUser

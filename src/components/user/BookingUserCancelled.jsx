import React from 'react'
import { useState } from 'react';
import { BookingService } from '../../services/BookingService';
import { handleApiError } from '../../utils/handleApiError';
import { useDispatch } from 'react-redux';
import { updateBooking } from '../../feautere/booking/bookingsSlice';
import Loader from '../ui/Loader';
import ErrorMessage from '../ui/ErrorMessage';
import { updateUserBookings } from '../../feautere/auth/authSlice';

const bookingService = new BookingService();

const BookingUserCancelled = ({ booking, setIsModalOpen }) => {
    const [showSuccess, setShowSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const[error, setError] = useState(null);
    const dispatch = useDispatch();

    const handleCancelBooking = async () => {
        try {
            setLoading(true);
            console.log(booking);
            const data = await bookingService.update(booking.id, {
                status: 'cancelled',
            });
            if (data) {
                dispatch(updateBooking(data));
                dispatch(updateUserBookings(data));
                setShowSuccess(true);
                setTimeout(() => {
                    setShowSuccess(false);
                    setIsModalOpen(false);
                }, 2000);
            }
        } catch (err) {
            setError(handleApiError(err));
            console.log(err);
        } finally {
            setLoading(false);
        }
    };
    if (loading) return <Loader message='Actualizando estado...' />
    if (error) return <ErrorMessage error={error} />
    return (
        <div className="flex flex-col items-center">
            <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 transition-all duration-300">
                <div className="bg-white p-8 rounded-xl shadow-2xl transform transition-all duration-300 hover:scale-[1.02] max-w-md w-full mx-4">
                    {!showSuccess ? (
                        <>
                            <h2 className="text-2xl font-bold mb-6 text-gray-800">Confirmar Cancelación</h2>
                            <p className="mb-6 text-gray-600 text-lg">¿Estás seguro de cancelar esta reserva?</p>
                            <div className="flex justify-end gap-4">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200"
                                >
                                    No, Mantener
                                </button>
                                <button
                                    onClick={handleCancelBooking}
                                    className="bg-red-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-600 transition-colors duration-200 shadow-md hover:shadow-lg"
                                >
                                    Sí, Cancelar
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-4">
                            <div className="mb-4 text-green-500">
                                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <p className="text-green-600 font-bold text-xl">¡Reserva cancelada exitosamente!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default BookingUserCancelled

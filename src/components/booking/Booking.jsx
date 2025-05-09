import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Listbox } from '@headlessui/react'
import {
    CheckIcon,
    ChevronUpDownIcon,
    CalendarDaysIcon,
    UserIcon,
    CreditCardIcon,
    InformationCircleIcon,
    CurrencyDollarIcon,
} from '@heroicons/react/20/solid'
import { useForm } from '../../hooks/useForm'
import Loader from '../ui/Loader'
import ErrorMessage from '../ui/ErrorMessage'
import { handleApiError } from '../../utils/handleApiError'
import QRDownload from './QRDownload'
import { BookingService } from '../../services/BookingService';
import { addUserBookings } from '../../feautere/auth/authSlice'


const paymentMethods = [
    { label: 'Tarjeta de Crédito', value: 'credit_card' },
    { label: 'Paypal', value: 'paypal' },
    { label: 'Transferencia Bancaria', value: 'bank_transfer' },
]

const bookingService = new BookingService();

const Booking = () => {
    const initialValue = {
        checkInDate: new Date(),
        checkOutDate: new Date(),
        guests: 1,
        paymentMethod: paymentMethods[0]

    };
    const [room, setRoom] = useState({})
    const { selectedRoom } = useSelector((state) => state.room)
    const { user } = useSelector((state) => state.auth)
    const [value, handleInputChange] = useForm(initialValue);
    const { checkInDate, checkOutDate, guests, paymentMethod } = value;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [bookingData, setBookingData] = useState({});

    console.log(value)

    useEffect(() => {
        setRoom(selectedRoom);
    }, [selectedRoom])

    const nights =
        checkInDate && checkOutDate
            ? Math.max(
                1,
                Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24))
            )
            : 0

    const total = room?.price ? (room.price * nights).toFixed(2) : '0.00'

    const handelSubmit = async (e) => {
        try {
            setLoading(true);
            const data = await bookingService.create({
                ...value,
                totalPrice: Number(total),
                paymentMethod: paymentMethod.value,
                userId: user.id,
                roomId: room.id
            });
            if (data) {
                console.log(data);
                setBookingData(data);
                addUserBookings(data);
            }
        } catch (err) {
            console.error(err.message);
            setError(handleApiError(err));
        } finally {
            setLoading(false);
        }
    }
    if (loading) return <Loader message='Registrando reserva...' />
    if (error) return <ErrorMessage error={error} />
    if (bookingData?.id) return <QRDownload value={bookingData} />



    return (
        <div className="min-h-screen from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center px-4 py-10 animate__animated animate__fadeIn">
            <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 overflow-hidden border border-indigo-100">

                {/* Imagen solo en desktop */}
                <div className="hidden md:flex flex-col justify-center items-center relative h-full bg-gradient-to-tr from-indigo-200 via-purple-200 to-pink-200">
                    <div className="bg-white/70 p-7 rounded-2xl text-base text-gray-700 space-y-3 shadow-inner w-80 mx-auto">
                        <p className="text-base text-indigo-600 font-semibold">
                            {user?.name && `Hola ${user.name}`}
                        </p>
                        <div className="flex justify-between">
                            <span className="font-semibold flex items-center gap-1">
                                <InformationCircleIcon className="w-5 h-5 text-blue-500" />
                                Habitación:
                            </span>
                            <span>{room?.name}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-semibold">Número:</span>
                            <span>{room?.number}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-semibold">Precio por noche:</span>
                            <span className="text-indigo-600 font-bold">${room?.price}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-semibold">Desde:</span>
                            <span>{checkInDate ? checkInDate.toLocaleDateString() : '-'}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-semibold">Hasta:</span>
                            <span>{checkOutDate ? checkOutDate.toLocaleDateString() : '-'}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-semibold">Noches:</span>
                            <span>{nights}</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold border-t pt-3">
                            <span className="flex items-center gap-1 text-indigo-700">
                                <CurrencyDollarIcon className="w-6 h-6" />
                                Total estimado:
                            </span>
                            <span className="text-indigo-700">${total}</span>
                        </div>
                    </div>
                </div>

                {/* Formulario */}
                <div className="p-8 space-y-8 flex flex-col justify-center">
                    <div className="text-center">
                        <h2 className="text-3xl font-extrabold text-gray-800 mb-2 tracking-tight">Reserva tu habitación</h2>
                        <p className="text-gray-500 text-base">Completa los datos para confirmar tu reserva</p>
                    </div>

                    <form className="space-y-6" onSubmit={handelSubmit}>
                        {/* Fecha Entrada */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Fecha de Entrada</label>
                            <div className="relative">
                                <CalendarDaysIcon className="w-5 h-5 text-indigo-400 absolute left-3 top-3.5" />
                                <DatePicker
                                    name='checkInDate'
                                    selected={checkInDate}
                                    onChange={(date) => handleInputChange(date, 'checkInDate')}
                                    dateFormat="dd/MM/yyyy"
                                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none bg-gray-50 transition"
                                    placeholderText="Selecciona la fecha"
                                    minDate={new Date()}

                                />
                            </div>
                        </div>

                        {/* Fecha Salida */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Fecha de Salida</label>
                            <div className="relative">
                                <CalendarDaysIcon className="w-5 h-5 text-indigo-400 absolute left-3 top-3.5" />
                                <DatePicker
                                    name='checkOutDate'
                                    selected={checkOutDate}
                                    onChange={(date) => handleInputChange(date, 'checkOutDate')}
                                    dateFormat="dd/MM/yyyy"
                                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none bg-gray-50 transition"
                                    placeholderText="Selecciona la fecha"
                                    minDate={checkInDate}
                                />
                            </div>
                            {
                                checkOutDate && checkOutDate && checkOutDate < checkInDate && (
                                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                        La fecha de salida no puede ser anterior a la fecha de entrada
                                    </p>
                                )}
                        </div>

                        {/* Huéspedes */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Número de Huéspedes</label>
                            <div className="relative">
                                <UserIcon className="w-5 h-5 text-indigo-400 absolute left-3 top-3.5" />
                                <input
                                    type="number"
                                    min="1"
                                    name='guests'
                                    value={guests}
                                    onChange={handleInputChange}
                                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none bg-gray-50 transition"
                                />
                            </div>
                            {
                                guests && room.capacity && room.capacity < guests && (
                                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                        {`El número  de huéspedes no puede ser mayor a: ${room.capacity}`}
                                    </p>
                                )}
                        </div>

                        {/* Método de Pago */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Método de Pago</label>
                            <Listbox name='paymentMethod' value={paymentMethod} onChange={(paymentMethod) => handleInputChange(paymentMethod, 'paymentMethod')}>
                                <div className="relative">
                                    <Listbox.Button className="w-full flex justify-between items-center px-4 py-3 border border-gray-200 rounded-2xl bg-white shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none transition">
                                        <span className="flex items-center gap-2">
                                            <CreditCardIcon className="w-5 h-5 text-indigo-400" />
                                            {paymentMethod.label}
                                        </span>
                                        <ChevronUpDownIcon className="h-5 w-5 text-indigo-400" />
                                    </Listbox.Button>
                                    <Listbox.Options className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-2xl shadow-lg">
                                        {paymentMethods.map((method, i) => (
                                            <Listbox.Option
                                                key={i}
                                                value={method}
                                                className={({ active }) =>
                                                    `cursor-pointer select-none px-4 py-2 ${active ? 'bg-indigo-100 text-indigo-700' : 'text-gray-900'}`
                                                }
                                            >
                                                {({ selected }) => (
                                                    <span className="flex justify-between items-center">
                                                        {method.label}
                                                        {selected && <CheckIcon className="w-5 h-5 text-indigo-500" />}
                                                    </span>
                                                )}
                                            </Listbox.Option>
                                        ))}
                                    </Listbox.Options>
                                </div>
                            </Listbox>
                        </div>

                        {/* Botones */}
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 pt-6">
                            <Link to="/rooms"
                                className="w-full sm:w-auto bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-full transition-all duration-300 flex items-center justify-center sm:justify-start gap-2 hover:-translate-x-1 shadow-sm"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                                </svg>
                                Volver
                            </Link>
                            <button
                                type="submit"
                                disabled={
                                    (checkOutDate && checkInDate && checkOutDate < checkInDate) ||
                                    (guests && room.capacity && room.capacity < guests)
                                }
                                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-500 hover:from-indigo-700 hover:to-purple-700 text-white font-bold px-8 py-3 rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-400
                                ${(checkOutDate && checkInDate && checkOutDate < checkInDate) || (guests && room.capacity && room.capacity < guests)
                                        ? 'opacity-50 cursor-not-allowed pointer-events-none'
                                        : ''
                                    }`
                                }
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                                Confirmar Reserva
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default Booking

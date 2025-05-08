import React from "react";
import Modal from "../Modal";

const bookingStatusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  checked_in: "bg-green-100 text-green-800",
  checked_out: "bg-gray-100 text-gray-800",
  cancelled: "bg-red-100 text-red-800",
  no_show: "bg-pink-100 text-pink-800"
};

const paymentStatusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  processing: "bg-blue-100 text-blue-800",
  paid: "bg-green-100 text-green-800",
  failed: "bg-red-100 text-red-800",
  refunded: "bg-purple-100 text-purple-800",
  partial_refund: "bg-indigo-100 text-indigo-800",
  cancelled: "bg-pink-100 text-pink-800"
};

const statusLabels = {
  pending: "Pendiente",
  confirmed: "Confirmada",
  checked_in: "Check-in realizado",
  checked_out: "Check-out realizado",
  cancelled: "Cancelada",
  no_show: "No show"
};

const paymentLabels = {
  pending: "Pendiente",
  processing: "Procesando",
  paid: "Pagado",
  failed: "Fallido",
  refunded: "Reembolsado",
  partial_refund: "Reembolso parcial",
  cancelled: "Cancelado"
};

const formatDate = (isoString) => {
  if (!isoString) return "—";
  const date = new Date(isoString);
  return date.toLocaleString("es-ES", {
    dateStyle: "long",
    timeStyle: "short"
  });
};

const BookingDetailModal = ({ isOpen, onClose, booking }) => {
  if (!booking) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="relative bg-white p-6 rounded-2xl shadow-2xl max-w-2xl w-full mx-auto">
        <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
          Detalles de la reserva
        </h2>

        <ul className="w-full text-base text-gray-700 space-y-4 bg-white/80 rounded-xl p-6 shadow">
          <li>
            <span className="font-semibold text-gray-600">ID de reserva:</span>{" "}
            <span className="text-gray-900">{booking.id}</span>
          </li>
          <li className="flex gap-2 items-center">
            <span className="font-semibold text-gray-600">Estado de reserva:</span>
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${bookingStatusColors[booking.status] || "bg-gray-100 text-gray-700"}`}>
              {statusLabels[booking.status] || booking.status}
            </span>
          </li>
          <li className="flex gap-2 items-center">
            <span className="font-semibold text-gray-600">Estado de pago:</span>
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${paymentStatusColors[booking.paymentStatus] || "bg-gray-100 text-gray-700"}`}>
              {paymentLabels[booking.paymentStatus] || booking.paymentStatus}
            </span>
          </li>
          <li>
            <span className="font-semibold text-gray-600">Check-in estimado:</span>{" "}
            <span>{formatDate(booking.checkInDate)}</span>
          </li>
          <li>
            <span className="font-semibold text-gray-600">Check-out estimado:</span>{" "}
            <span>{formatDate(booking.checkOutDate)}</span>
          </li>
          <li>
            <span className="font-semibold text-gray-600">Check-in real:</span>{" "}
            <span>{formatDate(booking.actualCheckIn)}</span>
          </li>
          <li>
            <span className="font-semibold text-gray-600">Check-out real:</span>{" "}
            <span>{formatDate(booking.actualCheckOut)}</span>
          </li>
          <li>
            <span className="font-semibold text-gray-600">Precio total:</span>{" "}
            <span className="text-indigo-700 font-bold text-lg">${booking.totalPrice}</span>
          </li>
        </ul>
      </div>
    </Modal>
  );
};

export default BookingDetailModal;

import React, { useState } from "react";
import Modal from "../Modal";
import { UploadCloud, X } from "lucide-react";
import { useDispatch } from "react-redux";
import { handleApiError } from "../../../utils/handleApiError";
import { updateBooking } from "../../../feautere/booking/bookingsSlice";
import { BookingService } from "../../../services/BookingService";
import Loader from "../../ui/Loader";
import ErrorMessage from "../../ui/ErrorMessage";

const bookingService = new BookingService();

const BookingStatus = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  CANCELLED: "cancelled",
};

const PaymentStatus = {
  PAID: "paid",
  UNPAID: "unpaid",
  REFUNDED: "refunded",
};

const PaymentMethod = {
  CASH: "cash",
  CREDIT_CARD: "credit_card",
  PAYPAL: "paypal",
};

const BookingEditModal = ({ isOpen, onClose, booking }) => {
  const [form, setForm] = useState(booking);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        checkInDate: new Date(form.checkInDate),
        checkOutDate: new Date(form.checkOutDate),
        guests: Number(form.guests),
        totalPrice: Number(form.totalPrice),
        status: form.status,
        paymentStatus: form.paymentStatus,
        paymentMethod: form.paymentMethod,
        cancellationReason: form.cancellationReason || null,
        userId: form.userId,
        roomId: form.roomId,
      };

      const data = await bookingService.update(form.id, payload);
      if (data) {
        dispatch(updateBooking(data));
        onClose();
      }
    } catch (error) {
      setError(handleApiError(error));
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader message="Actualizando reserva..." />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="relative">
        <button
          onClick={onClose}
          className="absolute right-0 top-0 m-2 p-2 rounded-full hover:bg-gray-100 transition"
        >
          <X className="w-6 h-6 text-gray-400 hover:text-indigo-600" />
        </button>
        <h2 className="text-2xl font-extrabold text-indigo-700 mb-6 text-center">Editar Reserva</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="datetime-local"
              name="checkInDate"
              value={form.checkInDate?.slice(0, 16)}
              onChange={handleChange}
              className="border rounded-xl p-3"
              required
            />
            <input
              type="datetime-local"
              name="checkOutDate"
              value={form.checkOutDate?.slice(0, 16)}
              onChange={handleChange}
              className="border rounded-xl p-3"
              required
            />
            <input
              type="number"
              name="guests"
              value={form.guests}
              onChange={handleChange}
              placeholder="Huéspedes"
              className="border rounded-xl p-3"
              required
            />
            <input
              type="number"
              name="totalPrice"
              value={form.totalPrice}
              onChange={handleChange}
              placeholder="Precio total"
              className="border rounded-xl p-3"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="border rounded-xl p-3"
            >
              {Object.values(BookingStatus).map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            <select
              name="paymentStatus"
              value={form.paymentStatus}
              onChange={handleChange}
              className="border rounded-xl p-3"
            >
              {Object.values(PaymentStatus).map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            <select
              name="paymentMethod"
              value={form.paymentMethod}
              onChange={handleChange}
              className="border rounded-xl p-3"
            >
              {Object.values(PaymentMethod).map((method) => (
                <option key={method} value={method}>
                  {method}
                </option>
              ))}
            </select>
            <input
              type="text"
              name="cancellationReason"
              value={form.cancellationReason || ""}
              onChange={handleChange}
              placeholder="Motivo de cancelación (opcional)"
              className="border rounded-xl p-3 col-span-2"
            />
          </div>

          <input
            type="text"
            name="userId"
            value={form.user.id}
            onChange={handleChange}
            placeholder="ID de usuario"
            className="border rounded-xl p-3 w-full opacity-100"
            disabled
            required
          />
          <input
            type="text"
            name="roomId"
            value={form.room.id}
            onChange={handleChange}
            placeholder="ID de habitación"
            className="border rounded-xl p-3 w-full opacity-75"
            disabled
            required
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition active:scale-95 shadow-lg"
          >
            Guardar cambios
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default BookingEditModal;

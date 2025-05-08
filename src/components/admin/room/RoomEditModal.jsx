import React, { useState } from "react";
import Modal from "../Modal";
import { UploadCloud, X } from "lucide-react";
import { updateRoom } from "../../../feautere/room/roomSlice";
import { handleApiError } from "../../../utils/handleApiError";
import Loader from "../../ui/Loader";
import ErrorMessage from "../../ui/ErrorMessage";
import { useDispatch } from "react-redux";
import { RoomService } from "../../../services/RoomService";
import { fileUpload } from "../../../helpers/fileUpload";

const RoomType = {
  SIMPLEX: 'simplex',
  DUPLEX: 'duples',
  DELUXE: 'deluxe',
  SUITE: 'suite',
}

const RoomStatus = {
  AVAILABLE: 'available',
  OCCUPIED: 'occupied',
  MAINTENANCE: 'maintenance',
  RESERVED: 'reserved',
}
const roomService = new RoomService();

const RoomEditModal = ({ isOpen, onClose, room }) => {
  const [preview, setPreview] = useState(room.img);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState(room);
  const dispatch = useDispatch();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({ ...prev, img: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let secureUrl = '';
    try {
      if (form.img instanceof File) {
        secureUrl = await fileUpload(form.img);
      }
    } catch (error) {
      console.log(error);
      setError("Error al subir la imagen");
      return;
    }

    try {
      setLoading(true);
      const { id, bookings, updated_at, created_at, ...roomData } = form;
      const payload = {
        ...roomData,
        img: secureUrl ? secureUrl : form.img
      };
      console.log(payload)
      const data = await roomService.update(
        room.id,
        payload
      );
      if (data) {
        dispatch(updateRoom(data));
      }
    } catch (error) {
      setError(handleApiError(error));
      console.log(error)
    } finally {
      setLoading(false);
      onClose();
    };
  }
  if (loading) return <Loader message="Actualizando habitación..." />;
  if (error) return <ErrorMessage error={error} />;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-0 top-0 m-2 p-2 rounded-full hover:bg-gray-100 transition"
          aria-label="Cerrar"
        >
          <X className="w-6 h-6 text-gray-400 hover:text-indigo-600" />
        </button>
        <h2 className="text-2xl font-extrabold text-indigo-700 mb-6 text-center">Editar habitación</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-1" htmlFor="number">Número</label>
              <input
                id="number"
                type="number"
                name="number"
                value={form.number}
                onChange={handleChange}
                placeholder="Ej: 101"
                className="border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition opacity-50 cursor-not-allowed"
                disabled
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-1" htmlFor="price">Precio</label>
              <input
                id="price"
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="Ej: 120"
                className="border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-1" htmlFor="capacity">Capacidad</label>
              <input
                id="capacity"
                type="number"
                name="capacity"
                value={form.capacity}
                onChange={handleChange}
                placeholder="Ej: 2"
                className="border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-1" htmlFor="floor">Piso</label>
              <input
                id="floor"
                type="number"
                name="floor"
                value={form.floor}
                onChange={handleChange}
                placeholder="Ej: 1"
                className="border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-1" htmlFor="type">Tipo</label>
              <select
                id="type"
                name="type"
                value={form.type}
                onChange={handleChange}
                className="border border-gray-300 rounded-xl p-3 bg-white focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
              >
                {Object.values(RoomType).map((type) => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-1" htmlFor="status">Estado</label>
              <select
                id="status"
                name="status"
                value={form.status}
                onChange={handleChange}
                className="border border-gray-300 rounded-xl p-3 bg-white focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
              >
                {Object.values(RoomStatus).map((status) => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2">
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-48 object-cover rounded-xl border border-gray-300"
                title="Vista previa de la imagen"
              />
            )}
            <label className="w-full flex items-center justify-center gap-2 p-3 border-2 border-dashed border-indigo-300 rounded-xl cursor-pointer hover:bg-indigo-50 transition group">
              <UploadCloud className="text-indigo-600" />
              <span className="text-indigo-600 font-medium group-hover:underline">Subir imagen</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
            <span className="text-xs text-gray-400">Formatos permitidos: JPG, PNG. Tamaño máximo recomendado: 2MB.</span>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition active:scale-95 shadow-lg"
          >
            Guardar habitación
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default RoomEditModal;

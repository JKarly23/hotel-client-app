import React, { useState } from "react";
import Modal from "../Modal";
import { UploadCloud, X } from "lucide-react";
import { RoomService } from "../../../services/RoomService";
import { fileUpload } from "../../../helpers/fileUpload";
import { useDispatch } from "react-redux";
import { setUser } from "../../../feautere/auth/authSlice";
import { handleApiError } from "../../../utils/handleApiError";
import Loader from "../../ui/Loader";
import ErrorMessage from "../../ui/ErrorMessage";

const roomService = new RoomService();

const RoomType = {
  SIMPLEX: 'simplex',
  DUPLEX: 'duples',
  DELUXE: 'deluxe',
  SUITE: 'suite',
};

const RoomStatus = {
  AVAILABLE: 'available',
  OCCUPIED: 'occupied',
  MAINTENANCE: 'maintenance',
  RESERVED: 'reserved',
};

const RoomCreateModal = ({ isOpen, onClose }) => {
  const [preview, setPreview] = useState(null);
  const [form, setForm] = useState({
    number: "",
    price: "",
    type: RoomType.SIMPLEX,
    status: RoomStatus.AVAILABLE,
    capacity: 1,
    description: "",
    floor: 1,
    img: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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
      setError("Error al subir la imagen");
      return;
    }

    try {
      setLoading(true);
      const room = {
        ...form,
        img: secureUrl,
      };
      console.log(room)
      const data = await roomService.create(room);
      if (data) {
        dispatch(setUser(data));
      }
    } catch (err) {
      setError(handleApiError(err));
      console.log(error)
    } finally {
      setLoading(false);
      onClose();
    }
  };

  if (loading) return <Loader message="Insertando nueva habitación..." />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="relative bg-white p-6 rounded-2xl shadow-2xl max-w-2xl w-full mx-auto">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-indigo-600 transition"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
          Registrar nueva habitación
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Formulario ocupa 2/3 en desktop */}
          <form onSubmit={handleSubmit} className="space-y-6 md:col-span-2 order-2 md:order-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="number" className="text-sm font-semibold text-gray-700">
                  Número
                </label>
                <input
                  id="number"
                  name="number"
                  type="number"
                  value={form.number}
                  onChange={handleChange}
                  placeholder="Ej: 101"
                  className="w-full mt-1 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 transition"
                  required
                />
              </div>

              <div>
                <label htmlFor="price" className="text-sm font-semibold text-gray-700">
                  Precio
                </label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="Ej: 120"
                  className="w-full mt-1 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 transition"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="description" className="text-sm font-semibold text-gray-700">
                  Descripción
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Describe brevemente la habitación..."
                  rows="4"
                  className="w-full mt-1 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 transition resize-none"
                ></textarea>
              </div>

              <div>
                <label htmlFor="capacity" className="text-sm font-semibold text-gray-700">
                  Capacidad
                </label>
                <input
                  id="capacity"
                  name="capacity"
                  type="number"
                  value={form.capacity}
                  onChange={handleChange}
                  placeholder="Ej: 2"
                  className="w-full mt-1 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 transition"
                />
              </div>

              <div>
                <label htmlFor="floor" className="text-sm font-semibold text-gray-700">
                  Piso
                </label>
                <input
                  id="floor"
                  name="floor"
                  type="number"
                  value={form.floor}
                  onChange={handleChange}
                  placeholder="Ej: 1"
                  className="w-full mt-1 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 transition"
                />
              </div>

              <div>
                <label htmlFor="type" className="text-sm font-semibold text-gray-700">
                  Tipo
                </label>
                <select
                  id="type"
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className="w-full mt-1 p-3 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-indigo-400 transition"
                >
                  {Object.values(RoomType).map((type) => (
                    <option key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="status" className="text-sm font-semibold text-gray-700">
                  Estado
                </label>
                <select
                  id="status"
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full mt-1 p-3 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-indigo-400 transition"
                >
                  {Object.values(RoomStatus).map((status) => (
                    <option key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col items-center">
              {preview && (
                <div className="w-full flex flex-col items-center mb-2">
                  <img
                    src={preview}
                    alt="Vista previa"
                    className="max-w-xs w-full h-48 object-cover rounded-xl border border-gray-300 shadow mb-2"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setPreview(null);
                      setForm((prev) => ({ ...prev, img: null }));
                    }}
                    className="text-xs text-pink-600 hover:underline mb-2"
                  >
                    Quitar imagen
                  </button>
                </div>
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
              <span className="text-xs text-gray-400 mt-1">
                Formatos permitidos: JPG, PNG. Tamaño máximo recomendado: 2MB.
              </span>
            </div>

            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="w-full md:w-1/2 bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition active:scale-95 shadow-lg"
              >
                Guardar habitación
              </button>
            </div>
          </form>
          {/* Imagen a la derecha en desktop, abajo en mobile */}
          <div className="flex flex-col items-center order-1 md:order-2">
            {preview && (
              <div className="flex flex-col items-center mb-2">
                <img
                  src={preview}
                  alt="Vista previa"
                  className="max-w-xs w-full h-48 object-cover rounded-xl border border-gray-300 shadow mb-2"
                />
                <button
                  type="button"
                  onClick={() => {
                    setPreview(null);
                    setForm((prev) => ({ ...prev, img: null }));
                  }}
                  className="text-xs text-pink-600 hover:underline mb-2"
                >
                  Quitar imagen
                </button>
              </div>
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
            <span className="text-xs text-gray-400 mt-1">
              Formatos permitidos: JPG, PNG. Tamaño máximo recomendado: 2MB.
            </span>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default RoomCreateModal;

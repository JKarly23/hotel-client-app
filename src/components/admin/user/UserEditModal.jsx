import React, { useState } from "react";
import Modal from "../Modal";
import Loader from "../../ui/Loader";
import ErrorMessage from "../../ui/ErrorMessage";
import { useDispatch } from "react-redux";
import { handleApiError } from "../../../utils/handleApiError";
import { AuthService } from "../../../services/AuthService";
import { updateUser } from "../../../feautere/auth/authSlice";
import { UploadCloud, X } from "lucide-react";
import { fileUpload } from "../../../helpers/fileUpload";


const userService = new AuthService();

export const roles = [
    { key: 'ADMIN', value: 'admin' },
    { key: 'USER', value: 'user' },
    { key: 'RECEPCIONIST', value: 'recepcionist' },
]


const UserEditModal = ({ isOpen, onClose, user }) => {
    const dispatch = useDispatch();
    const [form, setForm] = useState(user);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [preview, setPreview] = useState(user.img);


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
        setLoading(true);
        setError(null);
        try {
            const { id, created_at, updated_at, lastLogin, lastLogout, ...userPayload } = form;
            const updatedUser = await userService.update(id, {
                ...userPayload,
                img: secureUrl ? secureUrl : form.img
            });
            console.log(updatedUser)
            if (updatedUser) dispatch(updateUser(updatedUser));
            onClose();
        } catch (err) {
            console.log(err)
            setError(handleApiError(err));
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loader message="Actualizando usuario..." />;
    if (error) return <ErrorMessage error={error} />;

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="relative">
                <button
                    onClick={onClose}
                    className="absolute right-0 top-0 m-2 p-2 rounded-full hover:bg-gray-100 transition"
                    aria-label="Cerrar"
                >
                    <X className="w-6 h-6 text-gray-400 hover:text-indigo-600" />
                </button>
                <h2 className="text-2xl font-extrabold text-indigo-700 mb-6 text-center">Editar usuario</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label htmlFor="name" className="text-sm font-semibold text-gray-700 mb-1">Nombre</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={form.name}
                                onChange={handleChange}
                                required
                                className="border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="email" className="text-sm font-semibold text-gray-700 mb-1">Email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                                className="border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label htmlFor="role" className="text-sm font-semibold text-gray-700 mb-1">Rol</label>
                            <select
                                id="role"
                                name="role"
                                value={form.role}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-xl p-3 bg-white focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
                            >
                                {roles.map((r) => (
                                    <option key={r} value={r.value}>
                                        {r.key}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {/* <div className="flex flex-col">
                            <label htmlFor="dni" className="text-sm font-semibold text-gray-700 mb-1">DNI</label>
                            <input
                                id="dni"
                                name="dni"
                                type="text"
                                value={form.dni}
                                onChange={handleChange}
                                placeholder="Ej: 12345678"
                                className="border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
                            />
                        </div> */}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label htmlFor="phoneNumber" className="text-sm font-semibold text-gray-700 mb-1">Teléfono</label>
                            <input
                                id="phoneNumber"
                                name="phoneNumber"
                                type="tel"
                                value={form.phoneNumber || ""}
                                onChange={handleChange}
                                placeholder="Ej: +5355555555"
                                className="border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="country" className="text-sm font-semibold text-gray-700 mb-1">País</label>
                            <input
                                id="country"
                                name="country"
                                type="text"
                                value={form.country || ""}
                                onChange={handleChange}
                                placeholder="Ej: Cuba"
                                className="border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        {preview && (
                            <div className="flex justify-center">
                                <img
                                    src={preview}
                                    alt="Vista previa"
                                    className="max-w-xs aspect-[4/3] object-cover rounded-xl border border-gray-300 shadow-md transition-all duration-300"
                                />
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
                        <span className="text-xs text-gray-400">Formatos permitidos: JPG, PNG. Tamaño máximo recomendado: 2MB.</span>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition active:scale-95 shadow-lg"
                    >
                        Guardar usuario
                    </button>
                </form>
            </div>
        </Modal>
    );
};

export default UserEditModal;

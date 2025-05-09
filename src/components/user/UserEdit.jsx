import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../../services/AuthService";
import { fileUpload } from "../../helpers/fileUpload";
import { handleApiError } from "../../utils/handleApiError";
import Loader from "../ui/Loader";
import ErrorMessage from "../ui/ErrorMessage";
import { setUser, updateUser,  } from "../../feautere/auth/authSlice";
import { UploadCloud } from "lucide-react";

const userService = new AuthService();

const UserEdit = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: user?.name || '',
        email: user?.email || '',
        country: user?.country || '',
        birthDate: user?.birthDate ? user.birthDate.slice(0, 10) : '',
        phoneNumber: user?.phoneNumber || '',
        img: user?.img || '',
    });

    const [preview, setPreview] = useState(user?.img || '');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setForm((prev) => ({ ...prev, img: reader.result }));
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        let secureUrl = form.img;
        if (form.img.startsWith('data:image')) {
            try {
                secureUrl = await fileUpload(form.img);
            } catch (err) {
                setError("Error al subir la imagen");
                setLoading(false);
                return;
            }
        }

        try {
            const updatedUser = await userService.update(user.id, { ...form, img: secureUrl ? secureUrl : user.img });
            dispatch(updateUser(updatedUser));
            dispatch(setUser(updatedUser));
            navigate("/profile");
        } catch (err) {
            setError(handleApiError(err));
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loader message="Actualizando tu perfil..." />;
    if (error) return <ErrorMessage error={error} />;

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center px-4 py-10">
            <form onSubmit={handleSubmit} className="w-full max-w-2xl bg-white p-10 rounded-3xl shadow-xl space-y-6">
                <h2 className="text-3xl font-extrabold text-center text-indigo-700">Editar mi perfil</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    {/* Columna de la imagen */}
                    <div className="flex flex-col items-center gap-4">
                        {preview && (
                            <img
                                src={preview}
                                alt="Vista previa"
                                className="w-40 h-40 rounded-full object-cover border-4 border-indigo-300 shadow-md"
                            />
                        )}
                        <label className="w-full flex items-center justify-center gap-2 p-3 border-2 border-dashed border-indigo-300 rounded-xl cursor-pointer hover:bg-indigo-50 transition group">
                            <UploadCloud className="text-indigo-600" />
                            <span className="text-indigo-600 font-medium group-hover:underline">
                                Subir imagen
                            </span>
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageChange}
                            />
                        </label>
                    </div>

                    {/* Columna del formulario */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-700 mb-1">Nombre</label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                required
                                className="border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                                className="border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-700 mb-1">Teléfono</label>
                            <input
                                type="tel"
                                name="phoneNumber"
                                value={form.phoneNumber}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-700 mb-1">País</label>
                            <input
                                type="text"
                                name="country"
                                value={form.country}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
                            />
                        </div>
                        <div className="flex flex-col md:col-span-2">
                            <label className="text-sm font-semibold text-gray-700 mb-1">Fecha de nacimiento</label>
                            <input
                                type="date"
                                name="birthDate"
                                value={form.birthDate}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <button
                                type="submit"
                                className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition active:scale-95 shadow-md"
                            >
                                Guardar cambios
                            </button>
                        </div>
                    </div>
                </div>

            </form>
        </div>
    );
};

export default UserEdit;

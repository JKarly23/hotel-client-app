import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from '../../hooks/useForm'
import { Link, useNavigate } from 'react-router-dom';
import { AuthService } from '../../services/AuthService';
import { fileUpload } from '../../helpers/fileUpload';
import { handleApiError } from '../../utils/handleApiError';
import Loader from '../ui/Loader';
import ErrorMessage from '../ui/ErrorMessage';
import { updateUser } from '../../feautere/auth/authSlice'


const userService = new AuthService()

const UserEdit = () => {
    const { user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    const [value, setForm] = useState({
        name: user?.name || '',
        email: user?.email || '',
        country: user?.country || '',
        birthDate: user?.birthDate ? user.birthDate.slice(0, 10) : '',
        phoneNumber: user?.phoneNumber || '',
        img: user?.img || '',
    })

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    let secureUrl = '';


    const handleChange = ({ target }) => {
        setForm({
            ...value,
            [target.name]: target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!value.img.startsWith('http')) {
            secureUrl = await fileUpload(value.img);
        }
        try {
            setLoading(true);
            const data = await userService.update(user.id, {
                ...value,
                img: secureUrl,
            });
            if (data) {
                console.log('Data: ',data);
                dispatch(updateUser(data))
                navigate('/profile');
            }
        } catch (error) {
            setError(handleApiError(error))
        } finally {
            setLoading(false);
        }
    }

    // Imagen de perfil por defecto
    const img = value.img || 'https://th.bing.com/th/id/R.6b0022312d41080436c52da571d5c697?rik=CWihwAiT6S2emg&pid=ImgRaw&r=0'
    if (loading) return <Loader message='Actualizando...' />
    if (error) return <ErrorMessage error={error} />
    return (
        <div className="min-h-screen from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-6">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-10 relative"
            >
                <div className="flex flex-col md:flex-row items-center gap-10">
                    {/* Avatar */}
                    <div className="relative group">
                        <img
                            src={img}
                            alt="Avatar"
                            className="w-40 h-40 rounded-full border-4 border-indigo-400 shadow-lg object-cover cursor-pointer transition-transform duration-300 group-hover:scale-105"
                            onClick={() => document.getElementById('fileInput').click()}
                        />
                        <input
                            id="fileInput"
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => setForm({ ...value, img: reader.result });
                                    reader.readAsDataURL(file);
                                }
                            }}
                        />
                        <p className="text-sm text-center text-gray-400 mt-2">Haz clic en la imagen para cambiarla</p>
                    </div>

                    {/* Info */}
                    <div className="flex-1 w-full">
                        <h2 className="text-3xl font-bold text-indigo-700 mb-4 text-center md:text-left">
                            Editar perfil
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <input
                                type="text"
                                name="name"
                                value={value.name}
                                onChange={handleChange}
                                placeholder="Nombre completo"
                                className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 shadow-sm focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 transition duration-200 outline-none text-gray-800 font-semibold placeholder:text-gray-400"
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                value={value.email}
                                onChange={handleChange}
                                placeholder="Correo electrónico"
                                className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 shadow-sm focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 transition duration-200 outline-none text-gray-800 font-semibold placeholder:text-gray-400"
                                required
                            />
                            <input
                                type="text"
                                name="country"
                                value={value.country}
                                onChange={handleChange}
                                placeholder="País"
                                className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 shadow-sm focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 transition duration-200 outline-none text-gray-800 font-semibold placeholder:text-gray-400"
                            />
                            <input
                                type="date"
                                name="birthDate"
                                value={value.birthDate}
                                onChange={handleChange}
                                className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 shadow-sm focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 transition duration-200 outline-none text-gray-800 font-semibold placeholder:text-gray-400"
                            />
                            <input
                                type="text"
                                name="phoneNumber"
                                value={value.phoneNumber}
                                onChange={handleChange}
                                placeholder="Teléfono"
                                className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 shadow-sm focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 transition duration-200 outline-none text-gray-800 font-semibold placeholder:text-gray-400"
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex justify-between items-center">
                    <Link
                        to="/profile"
                        className="text-indigo-600 hover:underline transition"
                    >
                        ← Volver al perfil
                    </Link>
                    <button
                        type="submit"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl font-semibold shadow-md transition duration-300"
                    >
                        Guardar cambios
                    </button>
                </div>
            </form>
        </div>

    )
}

export default UserEdit
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
import { useEffect } from 'react';


const userService = new AuthService()

const UserEdit = () => {
    const { user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const [secureUrl, setSecureUrl] = useState('');

    const [value, setForm] = useState({
        name: user?.name || '',
        email: user?.email || '',
        country: user?.country || '',
        birthDate: user?.birthDate ? user.birthDate.slice(0, 10) : '',
        phoneNumber: user?.phoneNumber || '',
        img: user?.img || '',
    })

    console.log(value)

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();


    const handleChange = ({ target }) => {
        setForm({
            ...value,
            [target.name]: target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()


        let updatedImg = value.img;

        // Solo subimos si es una imagen nueva en base64
        if (value.img && value.img.startsWith('data:image')) {
            try {
                updatedImg = await fileUpload(value.img);
            } catch (uploadError) {
                setError("Error al subir la imagen");
                setLoading(false);
                return;
            }
        }

        try {
            setLoading(true);
            const data = await userService.update(user.id, {
                ...value,
                img: updatedImg,
            });
            if (data) {
                console.log('Data: ', data);
                dispatch(updateUser(data))
                navigate('/profile');
            }
        } catch (error) {
            setError(handleApiError(error))
        } finally {
            setLoading(false);
        }
    }

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
                        {value.img ? (
                            <img
                                src={value.img}
                                alt="Avatar"
                                className="w-40 h-40 rounded-full border-4 border-indigo-400 shadow-lg object-cover cursor-pointer transition-transform duration-300 group-hover:scale-105"
                                onClick={() => document.getElementById('fileInput').click()}
                            />
                        ) : (
                            <div 
                                className="w-40 h-40 rounded-full border-4 border-indigo-400 shadow-lg bg-gray-100 flex items-center justify-center cursor-pointer transition-transform duration-300 group-hover:scale-105"
                                onClick={() => document.getElementById('fileInput').click()}
                            >
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    className="h-16 w-16 text-gray-400" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    stroke="currentColor"
                                >
                                    <path 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        strokeWidth={2} 
                                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" 
                                    />
                                    <path 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        strokeWidth={2} 
                                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" 
                                    />
                                </svg>
                            </div>
                        )}
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
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from '../../hooks/useForm'
import { Link, useNavigate } from 'react-router-dom';
import { AuthService } from '../../services/AuthService';
import { fileUpload } from '../../helpers/fileUpload';
import { handleApiError } from '../../utils/handleApiError';
import Loader from '../ui/Loader';
import ErrorMessage from '../ui/ErrorMessage';
import {updateUser} from '../../feautere/auth/authSlice'


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


    const handleChange = ({ target }) => {
        setForm({
            ...value,
            [target.name]: target.value,
        })
    }

    const handleSubmit = async (e) => {
        if (!value.img.startsWith('http')) {
            secureUrl = await fileUpload(value.img);
        }
        e.preventDefault()
        try {
            setLoading(true);
            const data = await userService.update(user.id, {
                ...value,
                img: secureUrl,
            });
            if (data) {
                console.log(data);
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
        <div className="min-h-screen flex flex-col items-center justify-center from-indigo-100 via-purple-100 to-pink-100 p-4">
            <form
                onSubmit={handleSubmit}
                className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl p-8 animate__animated animate__fadeIn flex flex-col items-center"
            >
                {/* Avatar editable */}
                <div className="flex flex-col items-center mt-4">
                    <div className="relative">
                        <img
                            src={img}
                            alt="Avatar"
                            className="w-36 h-36 rounded-full border-4 border-indigo-400 shadow-lg animate__animated animate__zoomIn object-cover cursor-pointer"
                            onClick={() => document.getElementById('fileInput').click()}
                        />
                        <input
                            id="fileInput"
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={e => {
                                const file = e.target.files[0];
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                        setForm({ ...value, img: reader.result });
                                    };
                                    reader.readAsDataURL(file);
                                }
                            }}
                        />
                    </div>
                </div>
                <div>
                    <h2 className="mt-4 text-3xl font-bold text-indigo-700 flex items-center gap-2 animate__animated animate__fadeInDown">
                        <input
                            type="text"
                            name="name"
                            value={value.name}
                            onChange={(e) => setForm(...value, e.target.value)}
                            className="bg-indigo-50 px-2 py-1 rounded text-indigo-700 font-bold text-center w-48 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
                            required
                        />
                        <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full ml-2 animate__animated animate__pulse uppercase tracking-wide">
                            {value?.role}
                        </span>
                    </h2>
                </div>
                {/* Campos editables */}
                <div className="w-full mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center gap-3 text-gray-600 animate__animated animate__fadeInLeft">
                        {/* SVG email */}
                        <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 12l-4-4-4 4m8 0v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6" />
                        </svg>
                        <input
                            type="email"
                            name="email"
                            value={value.email}
                            onChange={handleChange}
                            className="bg-indigo-50 px-2 py-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
                            required
                        />
                    </div>
                    <div className="flex items-center gap-3 text-gray-600 animate__animated animate__fadeInRight">
                        {/* SVG país */}
                        <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l9 4.5v11L12 22l-9-4.5v-11L12 2z" />
                        </svg>
                        <input
                            type="text"
                            name="country"
                            value={value.country}
                            onChange={handleChange}
                            placeholder="País"
                            className="bg-indigo-50 px-2 py-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-300 transition"
                        />
                    </div>
                    <div className="flex items-center gap-3 text-gray-600 animate__animated animate__fadeInLeft">
                        {/* SVG calendario */}
                        <svg className="w-5 h-5 text-pink-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <rect width="18" height="18" x="3" y="4" rx="2" />
                            <path d="M16 2v4M8 2v4M3 10h18" />
                        </svg>
                        <input
                            type="date"
                            name="birthDate"
                            value={value.birthDate}
                            onChange={handleChange}
                            className="bg-indigo-50 px-2 py-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-pink-300 transition"
                        />
                    </div>
                    <div className="flex items-center gap-3 text-gray-600 animate__animated animate__fadeInRight">
                        {/* SVG teléfono */}
                        <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm0 10a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2zm10-10a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zm0 10a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={value.phoneNumber}
                            onChange={handleChange}
                            placeholder="Teléfono"
                            className="bg-indigo-50 px-2 py-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                        />
                    </div>
                </div>
                <Link to="/profile"
                    className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-full transition-all duration-300 flex items-center gap-2 hover:-translate-x-1 shadow-sm"

                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Volver
                </Link>
                {/* Botón guardar */}
                <button
                    type="submit"
                    className={`mt-8 w-40 py-2 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg transition animate__animated animate__pulse`}
                >
                </button>

            </form >
        </div >
    )
}

export default UserEdit
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../../feautere/auth/authSlice';

const UserNav = ({ img, dropdownOpen, setDropdownOpen, setMobileMenuOpen }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(logout()) 
        setDropdownOpen(false)
        setMobileMenuOpen(false)
        navigate('/')
    }
    return (
        <>
            <div className="relative ">
                <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center space-x-2 rounded-full focus:outline-none"
                >
                    <img
                        src={img}
                        alt="Profile"
                        className="h-8 w-8 rounded-full object-cover"
                    />
                </button>
                {dropdownOpen && (
                    <div className="animated__animated animate__fadeInDown__fadeInDown absolute right-0 mt-2 w-52 rounded-xl shadow-xl bg-white ring-1 ring-black ring-opacity-5 z-50 animate-fade-in">
                        <div className="py-1">
                            <Link
                                to="/profile"
                                className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition rounded-lg"
                                onClick={() => {
                                    setDropdownOpen(false);
                                    setMobileMenuOpen(false);
                                }}
                            >
                                {/* Icono de usuario */}
                                <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A9 9 0 1112 21a9 9 0 01-6.879-3.196z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                Ver Perfil
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition rounded-lg"
                            >
                                {/* Icono de logout */}
                                <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" />
                                </svg>
                                Cerrar Sesión
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default UserNav

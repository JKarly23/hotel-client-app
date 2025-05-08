import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../../feautere/auth/authSlice';
import { UserCircle } from "lucide-react";


const UserNav = ({ img, dropdownOpen, setDropdownOpen, setMobileMenuOpen }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout(user.id));
        setDropdownOpen(false);
        setMobileMenuOpen(false);
        navigate('/')
    }

    const handleCloseMenus = () => {
        setDropdownOpen(false);
        setMobileMenuOpen(false);
    }

    return (
        <div className="relative">
            <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="group flex items-center space-x-2 rounded-full focus:outline-none hover:ring-2 hover:ring-indigo-500 transition-all duration-200"
            >
                <img
                    src={img}
                    alt="Profile"
                    className="h-10 w-10 rounded-full object-cover border-2 border-transparent group-hover:border-indigo-500 transition-all duration-200"
                />
            </button>

            {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-56 origin-top-right rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 transform transition-all duration-200 ease-out">
                    <div className="p-2 space-y-1">
                        <Link
                            to="/profile"
                            className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-lg transition-all duration-200"
                            onClick={handleCloseMenus}
                        >
                            <UserCircle/>
                            <span className="font-medium">View Profile</span>
                        </Link>

                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all duration-200"
                        >
                            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" />
                            </svg>
                            <span className="font-medium">Sign Out</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserNav

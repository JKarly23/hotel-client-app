import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

export default function RoomActions({ id, status }) {
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector((state) => state.auth);
    const [path, setPath] = useState( !isAuthenticated ? '/auth/login' : `/booking/${id}`)
    useEffect(() => {
        localStorage.setItem('lastPath', `/booking/${id}`)
    }, [id])

    return (
        <div className="animate__animated animate__fadeInUp mt-8 flex flex-col sm:flex-row gap-4 justify-between items-center w-full px-4">
            <Link to="/rooms"
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-full transition-all duration-300 flex items-center gap-2 hover:-translate-x-1 shadow-sm"
              
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Volver
            </Link>

            {status === 'available' ? (

                <Link to={path} className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-lg font-semibold px-8 py-3 rounded-full shadow-lg transition-all duration-300 hover:translate-x-1 hover:shadow-xl flex items-center gap-2">
                    Reservar ahora
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </Link>

            ) : (
                <div className={`
          px-8 py-3 rounded-full text-white text-lg font-semibold flex items-center gap-2
          ${status === 'occupied'
                        ? 'bg-gradient-to-r from-red-500 to-red-600'
                        : status === 'maintenance'
                            ? 'bg-gradient-to-r from-yellow-500 to-yellow-600'
                            : 'bg-gradient-to-r from-gray-500 to-gray-600'
                    }
        `}>
                    {status === 'occupied' && 'Ocupada'}
                    {status === 'maintenance' && 'En Mantenimiento'}
                    {status === 'cleaning' && 'En Limpieza'}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" clipRule="evenodd" />
                        <path fillRule="evenodd" d="M10 4a6 6 0 100 12 6 6 0 000-12z" clipRule="evenodd" />
                    </svg>
                </div>
            )}
        </div>
    );
}

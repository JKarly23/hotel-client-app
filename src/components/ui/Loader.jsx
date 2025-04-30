import React from 'react'

const Loader = ({message = 'Cargando...'}) => {
    return (
        <div className="animate__animated animate__fadeIn flex items-center justify-center min-h-screen w-full fixed top-0 left-0 bg-gray bg-opacity-50 backdrop-blur-sm z-50 transition-all duration-300">
            <div className="bg-white p-8 rounded-lg shadow-xl flex flex-col items-center space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-600"></div>
                <span className="text-lg font-semibold text-gray-800 animate-pulse">
                    {message}
                </span>
            </div>
        </div>
    );
}

export default Loader

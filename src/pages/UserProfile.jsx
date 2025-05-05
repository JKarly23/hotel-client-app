import React from 'react'
import { useSelector } from 'react-redux'

const UserProfile = () => {
  const { user } = useSelector((state) => state.auth);

  // Imagen de perfil por defecto
  const img = user?.img ? user.img : 'https://th.bing.com/th/id/R.6b0022312d41080436c52da571d5c697?rik=CWihwAiT6S2emg&pid=ImgRaw&r=0'

  return (
    <div className="min-h-screen flex flex-col items-center justify-center from-indigo-100 via-purple-100 to-pink-100 p-4">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-8 animate__animated animate__fadeIn">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="relative">
            <img
              src={img}
              alt="Avatar"
              className="w-36 h-36 rounded-full border-4 border-indigo-400 shadow-lg animate__animated animate__zoomIn"
            />
            <span className="absolute bottom-2 right-2 bg-indigo-500 rounded-full p-2 shadow-md">
              {/* SVG de usuario */}
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A9 9 0 1112 21a9 9 0 01-6.879-3.196z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </span>
          </div>
          <div className="flex-1 space-y-3">
            <h2 className="text-3xl font-bold text-indigo-700 flex items-center gap-2 animate__animated animate__fadeInDown">
              {user?.name}
              <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full ml-2 animate__animated animate__pulse">
                {user?.role}
              </span>
            </h2>
            <div className="flex items-center gap-2 text-gray-600">
              {/* SVG email */}
              <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 12l-4-4-4 4m8 0v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6" />
              </svg>
              <span>{user?.email}</span>
            </div>
            {user?.country && (
              <div className="flex items-center gap-2 text-gray-600">
                {/* SVG país */}
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l9 4.5v11L12 22l-9-4.5v-11L12 2z" />
                </svg>
                <span>{user.country}</span>
              </div>
            )}
            {user?.birthDate && (
              <div className="flex items-center gap-2 text-gray-600">
                {/* SVG calendario */}
                <svg className="w-5 h-5 text-pink-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <rect width="18" height="18" x="3" y="4" rx="2" />
                  <path d="M16 2v4M8 2v4M3 10h18" />
                </svg>
                <span>{new Date(user.birthDate).toLocaleDateString()}</span>
              </div>
            )}
            {user?.phoneNumber && (
              <div className="flex items-center gap-2 text-gray-600">
                {/* SVG teléfono */}
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm0 10a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2zm10-10a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zm0 10a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                <span>{user.phoneNumber}</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-gray-600">
              {/* SVG ID */}
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <path d="M16 7v6M8 7v6" />
              </svg>
              <span className="truncate">{user?.id}</span>
            </div>
          </div>
        </div>
        {/* Bookings */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-indigo-700 mb-4 animate__animated animate__fadeInLeft">Reservas recientes</h3>
          {user?.bookings && user.bookings.length > 0 ? (
            <ul className="space-y-3">
              {user.bookings.slice(0, 3).map((booking, idx) => (
                <li key={booking.id} className="flex items-center gap-4 bg-indigo-50 rounded-xl p-4 shadow animate__animated animate__fadeInUp">
                  {/* SVG habitación */}
                  <svg className="w-7 h-7 text-indigo-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <rect width="18" height="10" x="3" y="7" rx="2" />
                    <path d="M3 17v2a2 2 0 002 2h14a2 2 0 002-2v-2" />
                  </svg>
                  <div>
                    <div className="font-semibold text-indigo-800">Habitación: {booking.room?.number || 'N/A'}</div>
                    <div className="text-sm text-gray-600">Check-in: {booking.checkInDate}</div>
                    <div className="text-sm text-gray-600">Check-out: {booking.checkOutDate}</div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-gray-500 text-center animate__animated animate__fadeIn">
              No tienes reservas recientes.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserProfile
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSeccionSelected } from '../../feautere/admin/adminSlice'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const [isOpen, setIsOpen] = useState(true)

  const handleClick = (seccion) => {
    dispatch(setSeccionSelected(seccion))
  }

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const menuItems = [
    {
      label: 'Dashboard',
      icon: (
        <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13h2v-2H3v2zm4 0h2v-2H7v2zm4 0h2v-2h-2v2zm4 0h2v-2h-2v2zm4 0h2v-2h-2v2zM3 17h2v-2H3v2zm4 0h2v-2H7v2zm4 0h2v-2h-2v2zm4 0h2v-2h-2v2zm4 0h2v-2h-2v2z" />
        </svg>
      ),
      key: 'portada',
    },
    {
      label: 'Habitaciones',
      icon: (
        <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
          <rect x="3" y="10" width="18" height="8" rx="2" stroke="currentColor" strokeWidth="2" />
          <rect x="7" y="14" width="3" height="4" rx="1" fill="currentColor" />
          <rect x="14" y="14" width="3" height="4" rx="1" fill="currentColor" />
        </svg>
      ),
      key: 'rooms',
    },
    {
      label: 'Reservas',
      icon: (
        <svg className="w-6 h-6 text-pink-500" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
          <rect x="4" y="4" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="2" />
          <path d="M8 2v4M16 2v4M4 10h16" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
      key: 'bookings',
    },
    {
      label: 'Usuarios',
      icon: (
        <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
          <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
          <path d="M4 20v-1a4 4 0 014-4h8a4 4 0 014 4v1" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
      key: 'user',
    },
  ]

  return (
    <>
      {/* Botón para abrir/cerrar el sidebar */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 p-2 bg-indigo-600 text-white rounded-full shadow-lg md:hidden transition"
        aria-label="Abrir/cerrar menú"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
          </svg>
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white shadow-2xl p-6 transition-all duration-300 z-40 border-r border-indigo-100
          ${isOpen ? 'w-72' : 'w-0 overflow-hidden'}
          md:static md:w-72`}
      >
        <div className="flex flex-col h-full justify-between">
          <div>
            {/* Perfil */}
            <div className="flex items-center space-x-4 mb-10">
              <img
                src={user.img}
                alt={user.id}
                className="h-16 w-16 rounded-full object-cover border-4 border-indigo-400 shadow-md"
              />
              <div>
                <Link
                  to="/profile"
                  className="text-lg font-bold text-indigo-700 hover:underline"
                >
                  {user.name}
                </Link>
                <p className="text-xs text-gray-500 mt-1 bg-indigo-50 px-2 py-0.5 rounded-full w-fit">Administrador</p>
              </div>
            </div>

            {/* Menú */}
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => handleClick(item.key)}
                  className="w-full flex items-center space-x-4 px-5 py-3 rounded-xl hover:bg-indigo-50 text-gray-700 hover:text-indigo-700 font-medium transition-colors text-base group"
                >
                  <span className="transition-transform group-hover:scale-110">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Footer */}
          <p className="text-xs text-gray-400 text-center mt-10">
            &copy; {new Date().getFullYear()} LuxeStay Hotel
          </p>
        </div>
      </aside>
    </>
  )
}

export default Sidebar

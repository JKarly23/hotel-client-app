import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const UserInfoItem = ({ icon, label }) => (
  <div className="flex items-center gap-3 text-gray-600">
    <span className="w-5 h-5 text-indigo-500">{icon}</span>
    <span>{label}</span>
  </div>
);

const UserProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const img = user?.img || 'https://th.bing.com/th/id/R.6b0022312d41080436c52da571d5c697?rik=CWihwAiT6S2emg&pid=ImgRaw&r=0';

  const iconMap = {
    email: (
      <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 12l-4-4-4 4m8 0v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6" />
      </svg>
    ),
    country: (
      <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l9 4.5v11L12 22l-9-4.5v-11L12 2z" />
      </svg>
    ),
    birthDate: (
      <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <rect width="18" height="18" x="3" y="4" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
    ),
    phone: (
      <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h2a2 2 0 012 2v2..." />
      </svg>
    ),
    id: (
      <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <rect width="20" height="14" x="2" y="5" rx="2" />
        <path d="M16 7v6M8 7v6" />
      </svg>
    ),
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-tr from-indigo-100 via-purple-100 to-pink-100 mt-20">
      <div className="relative max-w-2xl w-full bg-white rounded-3xl shadow-xl p-8 space-y-8">
        {/* Edit Button */}
        <Link
          to={`/profile/edit/${user.id}`}
          className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-3 shadow-lg"
          title="Editar perfil"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13..." />
          </svg>
        </Link>

        {/* Avatar & Name */}
        <div className="flex flex-col items-center text-center">
          <img src={img} alt="Avatar" className="w-32 h-32 rounded-full border-4 border-indigo-400 shadow-md" />
          <h2 className="text-3xl font-bold text-indigo-700 mt-4">{user?.name}</h2>
          <span className="text-xs bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full uppercase tracking-wide mt-1">{user?.role}</span>
        </div>

        {/* Personal Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <UserInfoItem icon={iconMap.email} label={user?.email} />
          {user?.country && <UserInfoItem icon={iconMap.country} label={user.country} />}
          {user?.birthDate && <UserInfoItem icon={iconMap.birthDate} label={new Date(user.birthDate).toLocaleDateString()} />}
          {user?.phoneNumber && <UserInfoItem icon={iconMap.phone} label={user.phoneNumber} />}
          <UserInfoItem icon={iconMap.id} label={user?.id} />
        </div>

        {/* Bookings */}
        <div>
          <h3 className="text-xl font-semibold text-indigo-700 mb-3">Reservas</h3>
          {user?.bookings?.length > 0 ? (
            <ul className="space-y-3">
              {user.bookings.slice(0, 3).map((booking) => (
                <li key={booking.id} className="flex items-center gap-4 bg-indigo-50 rounded-xl p-4 shadow-sm">
                  <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect width="18" height="10" x="3" y="7" rx="2" />
                    <path d="M3 17v2a2 2 0 002 2h14a2 2 0 002-2v-2" />
                  </svg>
                  <div className="text-indigo-800 font-medium">Habitación: {booking.room?.number || 'N/A'}</div>
                </li>
              ))}
              <Link to={-1} className="inline-flex items-center gap-2 mt-4 text-sm text-indigo-600 hover:underline">
                Ver todas las reservas
              </Link>
            </ul>
          ) : (
            <p className="text-gray-500">No tienes reservas recientes.</p>
          )}
        </div>

        {/* Back Button */}
        <div className="flex justify-center">
          <Link
            to={-1}
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-5 py-2 rounded-full transition-transform hover:-translate-x-1 shadow"
          >
            Volver
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

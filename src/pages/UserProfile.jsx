import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MailIcon, GlobeIcon, CalendarIcon, PhoneIcon, FingerprintIcon, EditIcon } from "lucide-react";
import UserBookingsTable from '../components/user/UserBookingsTable';
import { useEffect } from 'react';

const UserInfoItem = ({ icon, label }) => (
  <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl shadow-sm">
    <div className="text-indigo-600">{icon}</div>
    <span className="text-gray-700 text-sm">{label}</span>
  </div>
);
const UserProfile = () => {

  const { user } = useSelector((state) => state.auth);

  const [showBookings, setShowBookings] = useState(false);
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
    <>{
      showBookings ? <UserBookingsTable key={user.id} bookings={user.bookings} back={setShowBookings} />
        :
        <div className="min-h-[90vh] flex items-center justify-center p-6 bg-gradient-to-tr from-indigo-100 via-purple-100 to-pink-100 mt-20">
          <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-xl p-10 grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Avatar & Edit Button */}
            <div className="flex flex-col items-center text-center space-y-5">
              <div className="relative">
                <img src={img} alt="Avatar" className="w-48 h-48 rounded-full border-4 border-indigo-400 shadow-md object-cover" />
                <Link
                  to={`/profile/edit/${user.id}`}
                  className="absolute bottom-3 right-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-2 shadow-lg"
                  title="Editar perfil"
                >
                  <EditIcon />
                </Link>
              </div>
              <h2 className="text-3xl font-bold text-indigo-700">{user?.name}</h2>
              <span className="text-sm bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full uppercase tracking-wide">{user?.role}</span>
            </div>

            {/* Info + Bookings */}
            <div className="flex flex-col justify-center space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <UserInfoItem icon={<MailIcon />} label={user?.email} />
                {user?.country && <UserInfoItem icon={<GlobeIcon />} label={user.country} />}
                {user?.birthDate && <UserInfoItem icon={<CalendarIcon />} label={new Date(user.birthDate).toLocaleDateString()} />}
                {user?.phoneNumber && <UserInfoItem icon={<PhoneIcon />} label={user.phoneNumber} />}
                <UserInfoItem icon={<FingerprintIcon />} label={user?.id} />
              </div>

              <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 shadow-sm">
                <h3 className="text-lg font-semibold text-indigo-700 mb-2">Reservas</h3>
                <p className="text-indigo-800 text-sm">
                  Tienes <span className="font-bold">{user?.bookings?.length || 0}</span> reserva{user?.bookings?.length === 1 ? '' : 's'} registrada{user?.bookings?.length === 1 ? '' : 's'}.
                </p>
                {
                  user?.bookings?.length  > 0 &&
                  < button onClick={() => setShowBookings(true)}
                    className="inline-block mt-2 text-sm text-indigo-600 hover:underline"
                  >
                    Ver todas las reservas →
                  </button>
                }
              </div>

              <div className="flex justify-start">
                <Link
                  to={-1}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-5 py-2 rounded-full transition-transform hover:-translate-x-1 shadow"
                >
                  Volver
                </Link>
              </div>
            </div>
          </div>
        </div >
    }
    </>

  );
};

export default UserProfile;

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AuthService } from '../../services/AuthService';
import { RoomService } from '../../services/RoomService';
import { BookingService } from '../../services/BookingService';
import { handleApiError } from '../../utils/handleApiError';
import Loader from '../ui/Loader';
import ErrorMessage from '../ui/ErrorMessage';
import {
  bookingsConfirmed,
  bookingsPending,
  bookingsCancelled,
  bookingsActive,
  bookingsFutured,
  bookingsCheckInToday,
  bookingsCheckOutToday,
  bookingsPast,
  bookingPaid,
  bookingPaidPending,
} from '../../helpers/admin/bookingHelper';
import {
  roomsAvailable,
  roomsOccupied,
  roomsMaintenance,
  roomsReserved,
  countByRoomType,
  avgRoomsOccupied,
  avgRoomsReserved,
  roomsMoreReserved
} from '../../helpers/admin/roomHelper';
import {
  avgAge,
  avgBookingsPerUser,
  countByUserRole,
  recentLogins,
  usersActive,
  usersWithActiveBookings,
  usersWithRolesAdmin,
  usersWithRolesUser
} from '../../helpers/admin/adminHelper';
import { useDispatch } from 'react-redux';
import { setBookings } from '../../feautere/booking/bookingsSlice';
import { setRooms } from '../../feautere/room/roomSlice';
import { setUsers } from '../../feautere/auth/authSlice';

const userService = new AuthService();
const roomService = new RoomService();
const bookingService = new BookingService();

const ICONS = {
  rooms: (
    <svg className="w-12 h-12 text-indigo-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 48 48">
      <rect x="6" y="14" width="36" height="24" rx="4" fill="#6366f1" opacity="0.15" />
      <rect x="6" y="14" width="36" height="24" rx="4" stroke="#6366f1" strokeWidth="2" />
      <rect x="14" y="22" width="8" height="8" rx="2" fill="#6366f1" />
      <rect x="26" y="22" width="8" height="8" rx="2" fill="#6366f1" />
      <rect x="20" y="18" width="8" height="4" rx="1" fill="#6366f1" opacity="0.5" />
    </svg>
  ),
  bookings: (
    <svg className="w-12 h-12 text-pink-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 48 48">
      <rect x="8" y="10" width="32" height="28" rx="4" fill="#ec4899" opacity="0.15" />
      <rect x="8" y="10" width="32" height="28" rx="4" stroke="#ec4899" strokeWidth="2" />
      <rect x="16" y="18" width="16" height="4" rx="2" fill="#ec4899" />
      <rect x="16" y="26" width="10" height="4" rx="2" fill="#ec4899" opacity="0.7" />
    </svg>
  ),
  users: (
    <svg className="w-12 h-12 text-emerald-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 48 48">
      <circle cx="24" cy="18" r="8" fill="#10b981" opacity="0.15" />
      <circle cx="24" cy="18" r="8" stroke="#10b981" strokeWidth="2" />
      <rect x="10" y="30" width="28" height="10" rx="5" fill="#10b981" opacity="0.15" />
      <rect x="10" y="30" width="28" height="10" rx="5" stroke="#10b981" strokeWidth="2" />
    </svg>
  ),
};

const AdminPortada = () => {
  const [rooms, setRoomsData] = useState([]);
  const [users, setUsersData] = useState([]);
  const [bookings, setBookingsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [roomsData, bookingsData, usersData] = await Promise.all([
          roomService.findAllData(),
          bookingService.findAllData(),
          userService.findAllData()
        ]);
        if (roomsData) {
          setRoomsData(roomsData);
          dispatch(setRooms(roomsData));
        }
        if (bookingsData) {
          setBookingsData(bookingsData);
          dispatch(setBookings(bookingsData));
        }
        if (usersData) {
          setUsersData(usersData);
          dispatch(setUsers(usersData));
        }
      } catch (err) {
        setError(handleApiError(err));
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Loader message="Cargando datos..." />;
  if (error) return <ErrorMessage error={error} />;

  const typeCounts = countByRoomType(rooms);
  const userRolesCounts = countByUserRole(users);

  return (
    <div className="w-full h-full min-h-screen bg-gradient-to-br from-gray-150 via-indigo-300 to-violet-250 p-4 md:p-5 flex flex-col">
      <h1 className="text-5xl font-extrabold mb-12 text-white text-center drop-shadow-lg tracking-tight flex items-center justify-center gap-4">
        <svg className="w-12 h-10 text-white drop-shadow-md" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
          <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Panel de Administración
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full">
        <AnimatedDashboardCard title="Habitaciones" icon={ICONS.rooms}>
          <InfoGrid data={[
            ['Total', rooms.length],
            ['Disponibles', roomsAvailable(rooms)],
            ['Ocupadas', roomsOccupied(rooms)],
            ['Reservadas', roomsReserved(rooms)],
            ['Mantenimiento', roomsMaintenance(rooms)],
            ['Prom. ocupación', avgRoomsOccupied(rooms) ? avgRoomsOccupied(rooms) : 0],
            ['Prom. reservas', avgRoomsReserved(rooms) ? avgRoomsReserved(rooms) : 0],
            ['Más reservada', `Hab. ${roomsMoreReserved(rooms)}`],
          ]} />
          <SubList title="Por tipo" items={typeCounts} />
        </AnimatedDashboardCard>
        <AnimatedDashboardCard title="Reservas" icon={ICONS.bookings}>
          <InfoGrid data={[
            ['Total', bookings.length],
            ['Confirmadas', bookingsConfirmed(bookings)],
            ['Pendientes', bookingsPending(bookings)],
            ['Canceladas', bookingsCancelled(bookings)],
            ['Activas', bookingsActive(bookings)],
            ['Futuras', bookingsFutured(bookings)],
            ['Pasadas', bookingsPast(bookings)],
            ['Check-in hoy', bookingsCheckInToday(bookings)],
            ['Check-out hoy', bookingsCheckOutToday(bookings)],
            ['Pagadas', bookingPaid(bookings)],
            ['Pago pendiente', bookingPaidPending(bookings)],
          ]} />
        </AnimatedDashboardCard>
        <AnimatedDashboardCard title="Usuarios" icon={ICONS.users}>
          <InfoGrid data={[
            ['Total', users.length],
            ['Rol: user', usersWithRolesUser(users)],
            ['Rol: admin', usersWithRolesAdmin(users)],
            ['Con reservas activas', usersWithActiveBookings(users)],
            ['Logins recientes', recentLogins(users)],
            ['Edad promedio', avgAge(users)],
            ['Reservas promedio', avgBookingsPerUser(users)],
            ['Usuarios activos', usersActive(users)],
          ]} />
          <SubList title="Por rol" items={userRolesCounts} />
        </AnimatedDashboardCard>
      </div>
    </div>
  );
};

const AnimatedDashboardCard = ({ title, icon, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="bg-white/70 rounded-3xl shadow-2xl p-8 border border-gray-200 flex flex-col items-center hover:shadow-indigo-300 transition-shadow duration-300 h-150"
  >
    <div className="flex flex-col items-center gap-2 mb-2">
      <span>{icon}</span>
      <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
    </div>
    {children}
  </motion.div>
);

const InfoGrid = ({ data }) => (
  <div className="grid grid-cols-1 gap-1 text-lg w-full">
    {data.map(([label, value]) => (
      <div key={label} className="flex justify-between text-gray-700 border-b border-gray-100 py-1">
        <span>{label}:</span>
        <span className="font-semibold text-gray-900">{value}</span>
      </div>
    ))}
  </div>
);

const SubList = ({ title, items }) => (
  <div className="mt-4 w-full">
    <h3 className="font-semibold text-gray-600 text-base mb-2">{title}:</h3>
    <ul className="grid grid-cols-2 gap-2 text-sm text-gray-700">
      {Object.entries(items).map(([key, value]) => (
        <li key={key} className="flex justify-between">
          <span>{key}</span>
          <span className="font-bold text-gray-900">{value}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default AdminPortada;

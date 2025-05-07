import React from 'react'
import Sidebar from '../components/admin/Sidebar'
import AdminPortada from '../components/admin/AdminPortada'
import RoomTable from '../components/admin/room/RoomTable'
import BookingTable from '../components/admin/booking/BookingTable'
import UserTable from '../components/admin/user/UserTable'
import { useSelector } from 'react-redux'

const Admin = () => {
  const { seccionSelected } = useSelector((state) => state.admin)

  const renderContent = () => {
    switch (seccionSelected) {
      case 'rooms':
        return <RoomTable />
      case 'bookings':
        return <BookingTable />
      case 'user':
        return <UserTable />
      default:
        return <AdminPortada />
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 px-4 md:px-5 overflow-auto pt-16 md:pt-0 w-full">
        {renderContent()}
      </main>
    </div>
  )
}

export default Admin

import React from 'react'
import { RoomService } from '../services/roomService'
import { useState } from 'react';
import { useEffect } from 'react';
import RoomGrid from '../components/RoomGrid';

const roomService = new RoomService();

const Room = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getRooms = async () => {
      setLoading(true);
      try {
        const data = await roomService.findALl();
        if (data) {
          console.log(data);
          setRooms(data.rooms);
        }
      } catch (err) {
        setError(err);
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    getRooms();
  }, [])
  if (loading) return <div>Cargando Habitaciones...</div>
  if (error) return <div>{error.message || 'Ha ocurrido un error'}</div>
  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Habitaciones en Nuestro Hotel</h2>
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {
              rooms.map((room, index) => {
                return <RoomGrid key={index} room={room} />
              })
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Room

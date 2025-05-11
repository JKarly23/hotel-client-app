import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ErrorMessage from '../ui/ErrorMessage'
import Loader from '../ui/Loader'
import { handleApiError } from '../../utils/handleApiError'
import RoomImageGallery from './RoomImageGallery'
import RoomInfo from './RoomInfo'
import RoomActions from './RoomActions'
import { RoomService } from '../../services/RoomService'
import { useDispatch } from 'react-redux'
import { setRoom } from '../../feautere/room/roomSlice'

const roomService = new RoomService()

const RoomDetail = () => {
  const [room, setRoomState] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { id } = useParams()

  const dispatch = useDispatch();

  const getRoomById = async () => {
    try {
      const fetchRoom = await roomService.findById(id)
      if (!fetchRoom) throw new Error('Habitación no encontrada', { cause: 'not_found' })
      setRoomState(fetchRoom)
      dispatch(setRoom(fetchRoom))
    } catch (err) {
      setError(handleApiError(err))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getRoomById()
  }, [id])

  if (loading) return <Loader message='Cargando habitación...' />
  if (error) return <ErrorMessage error={error} />

  return (
    <div className="min-h-screen from-gray-100 to-gray-200 p-4 sm:p-6 lg:p-10 flex justify-center items-start mt-15">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white p-6 lg:p-10 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
        <div className="flex items-center justify-center">
          <RoomImageGallery image={room.img} />
        </div>
        <div className="flex flex-col justify-center space-y-6">
          <RoomInfo room={room} />
          <RoomActions id={room.id} status={room.status} />
        </div>
      </div>
    </div>
  )
}

export default RoomDetail

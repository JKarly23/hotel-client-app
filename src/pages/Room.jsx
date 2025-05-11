import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import RoomGrid from '../components/rooms/RoomGrid';
import Loader from '../components/ui/Loader';
import ErrorMessage from '../components/ui/ErrorMessage';
import RoomFilter from '../components/rooms/RoomFilter';
import Pagination from '../components/ui/Pagination';
import { handleApiError } from '../utils/handleApiError';
import { RoomService } from '../services/RoomService';
import { setRooms } from '../feautere/room/roomSlice';

const roomService = new RoomService();

const Room = () => {
  const [rooms, setRoomsState] = useState([]);
  const [allRooms, setAllRooms] = useState([]);
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const getRooms = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await roomService.findAll(`?page=${page}&limit=12`);
      if (res?.rooms) {
        setRoomsState(res.rooms);
        setAllRooms(res.rooms);
        setPagination({ totalPages: res.totalPages, total: res.total, page: res.page, limit: res.limit });
        dispatch(setRooms(res.rooms));
      }
    } catch (err) {
      console.error(err);
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  }, [page, dispatch]);

  useEffect(() => {
    getRooms();
  }, [getRooms]);

  const handleNewPage = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPage(newPage);
    }
  };

  if (loading) return <Loader message="Cargando Habitaciones..." />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div className="bg-white animated__animated animated__fadeIn absolute inset-x-0 mt-30">
      <div className="mx-auto w-full px-4 py-8 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Habitaciones</h2>
          <RoomFilter allRooms={allRooms} setRooms={setRoomsState} />
        </div>

        <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 lg:grid-cols-4 gap-x-4">
          {rooms.map((room) => (
            <RoomGrid key={room.id || room._id} room={room} />
          ))}
        </div>

        <Pagination {...pagination} onPageChange={handleNewPage} />
      </div>
    </div>
  );
};

export default Room;

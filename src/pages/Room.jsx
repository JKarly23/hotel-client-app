import { useState, useEffect } from 'react';
import RoomGrid from '../components/rooms/RoomGrid';
import Loader from '../components/ui/Loader';
import ErrorMessage from '../components/ui/ErrorMessage';
import RoomFilter from '../components/rooms/RoomFilter';
import { handleApiError } from '../utils/handleApiError';
import Pagination from '../components/ui/Pagination';
import { RoomService } from '../services/RoomService';

const Room = () => {
  const [rooms, setRooms] = useState([]);
  const [allRooms, setAllRooms] = useState([]);
  const [data, setData] = useState({});
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const roomService = new RoomService();

  const getRooms = async () => {
    setLoading(true);
    try {
      const data = await roomService.findAll(`?page=${page}&limit=12`);
      
  
      if (data) {
        setData(data); 
        setAllRooms(data.rooms);
        setRooms(data.rooms);
      }
    } catch (err) {
      console.log(err)
      setError(handleApiError(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRooms();
  }, [page]);

  const handleNewPage = (newPage) => {
    if (newPage >= 1 && newPage <= data.totalPages) {
      setPage(newPage);
    }
  };

  if (loading) return <Loader message="Cargando Habitaciones..." />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div className="flex justify-start mt-4">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Habitaciones</h2>
          </div>
          <div className="flex justify-end mt-4">
          <RoomFilter allRooms={allRooms} setRooms={setRooms} />
          </div>
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {
              rooms.map((room, index) => (
                <RoomGrid key={index} room={room} />
              ))
            }
          </div>
          <Pagination
            {...data}
            onPageChange={handleNewPage}
          />
        </div>
      </div>
    </>
  );
};

export default Room;

import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const RoomGrid = ({ room }) => {
  return (
    <div
      className="group relative bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-xl transition-shadow duration-300 p-3 sm:p-4 flex flex-col h-full animate__animated animate__fadeIn"
    >
      <div>
        <a href={room.img} target="_blank" rel="noopener noreferrer">
          <img
            alt={`Imagen de la habitación ${room.number}`}
            src={room.img}
            className="w-full aspect-square sm:h-64 object-cover rounded-lg bg-gray-100 group-hover:opacity-90 mb-3"
          />
        </a>
      </div>

      <div className="flex-1 flex flex-col justify-between gap-2">
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1 sm:mb-2">
            Habitación No. {room.number}
          </h3>
          <p className="text-sm text-gray-500">
            <span className="font-medium">Capacidad:</span> {room.capacity}
          </p>
        </div>

        <div className="flex items-center justify-between mt-2">
          <p className={`text-xs font-bold px-3 py-1 rounded-full capitalize
            ${room.status === 'available'
              ? 'bg-green-100 text-green-800'
              : room.status === 'occupied'
                ? 'bg-red-100 text-red-800'
                : room.status === 'reserved'
                  ? 'bg-orange-200 text-orange-600'
                  : 'bg-yellow-100 text-yellow-800'
            }`}>
            {room.status}
          </p>
          <Link
            to={`/room/${room.id}`}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            Ver Detalles
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoomGrid;

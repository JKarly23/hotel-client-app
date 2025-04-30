export default function RoomInfo({ room }) {
  return (
    <div className="animate__animated animate__fadeInRight bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="border-b border-gray-200 pb-4 mb-4">
        <h2 className="text-3xl font-bold text-gray-800 tracking-tight">
          Habitación {room.number}
        </h2>
        <p className="mt-2 text-gray-600 leading-relaxed">{room.description}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-1 lg:grid-cols-2">
        <div className="bg-gray-50 rounded-lg p-3">
          <span className="block text-sm text-gray-500 mb-1">Capacidad</span>
          <p className="text-lg font-semibold text-gray-800">
            {room.capacity} personas
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-3">
          <span className="block text-sm text-gray-500 mb-1">Precio por noche</span>
          <p className="text-lg font-semibold text-emerald-600">
            ${room.price}
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-3">
          <span className="block text-sm text-gray-500 mb-1">Tipo</span>
          <p className="text-lg font-medium text-gray-800">{room.type}</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-3">
          <span className="block text-sm text-gray-500 mb-1">Piso</span>
          <p className="text-lg font-medium text-gray-800">{room.floor}</p>
        </div>
      </div>
    </div>
  )
}

import React from 'react'

const RoomGrid = ({ room }) => {
  console.log(room.img)
    return (<div key={room.id} className="group relative">
        <img
          alt={room.number}
          src={room.img}
          className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
        />
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700">
              <a href={room.img}>
                <span aria-hidden="true" className="absolute inset-0" />
                {room.number}
              </a>
            </h3>
            <p className="mt-1 text-sm text-gray-500">{room.capacity}</p>
          </div>
          <p className="text-sm font-medium text-gray-900">{room.status}</p>
        </div>
      </div>
    )
}

export default RoomGrid

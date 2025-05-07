export const roomsAvailable = (rooms) => {
    return rooms.filter((r) => r.status === 'available').length;
}

export const roomsOccupied = (rooms) => {
    return rooms.filter((r) => r.status === 'occupied').length;
}

export const roomsMaintenance = (rooms) => {
    return rooms.filter((r) => r.status === 'maintenance').length;
}

export const roomsReserved = (rooms) => {
    return rooms.filter((r) => r.status === 'reserved').length;
}

export const countByRoomType = (rooms) => {
    return rooms.reduce((acc, room) => {
        acc[room.type] = (acc[room.type] || 0) + 1;
        return acc;
    }, {});
};

export const avgRoomsOccupied = (rooms) => {
    const occupied = roomsOccupied(rooms);
    return occupied === 0 ? 0 : (rooms.length / occupied).toFixed(2);
}

export const avgRoomsReserved = (rooms) => {
    const reserved = roomsReserved(rooms);
    return (rooms.length / reserved).toFixed(2);
}

export const roomsMoreReserved = (rooms) => {
    let mayor = 0;
    let roomNumber = 0;
    rooms.map((room) => {
        if (mayor < room.bookings.length) {
            mayor = room.bookings.length;
            roomNumber = room.number;
        }
    })
    return roomNumber;
}

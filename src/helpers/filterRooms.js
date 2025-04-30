export const filterRooms = (term, rooms) => {
    const query = term.trim().toLowerCase();

    if (!query || query === 'all') return rooms;

    rooms = rooms.filter(room =>
        room.status?.toLowerCase().includes(query)
    );
    return rooms;
};

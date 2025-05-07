export const bookingsConfirmed = (bookings) => {
    return bookings.filter((b) => b.status === 'confirmed').length;
}

export const bookingsPending = (bookings) => {
    return bookings.filter((b) => b.status === 'pending').length;
}

export const bookingsCancelled = (bookings) => {
    return bookings.filter((b) => b.status === 'cancelled').length;
}

export const bookingsActive = (bookings) => {
    const now = new Date();
    return bookings.filter((booking) => new Date(booking.checkInDate) <= now || new Date(booking.checkOutDate) >= now).length;
}

export const bookingsFutured = (bookings) => {
    const now = new Date();
    return bookings.filter((booking) => new Date(booking.checkOutDate) >= now).length;
}

export const bookingsCheckInToday = (bookings) => {
    const today = new Date().toISOString().split('T')[0];
    return bookings.filter(
        (b) => new Date(b.checkInDate).toISOString().split('T')[0] === today
    ).length;
};

export const bookingsCheckOutToday = (bookings) => {
    const today = new Date().toISOString().split('T')[0];
    return bookings.filter(
        (b) => new Date(b.checkOutDate).toISOString().split('T')[0] === today
    ).length;
};

export const bookingsPast = (bookings) => {
    const now = new Date();
    return bookings.filter((booking) => new Date(booking.checkInDate) <= now).length;
}

export const bookingPaid = (bookings) => {
    return bookings.filter((booking) => booking.paymentStatus === 'paid').length;
}


export const bookingPaidPending = (bookings) => {
    return bookings.filter((booking) => booking.paymentStatus === 'pending').length;
}
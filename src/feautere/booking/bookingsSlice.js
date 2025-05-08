import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    bookings: [],
    selectedBookings: {}
};

export const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {
        setBookings: (state, action) => {
            state.bookings = action.payload;
        },
        setBookingSelected: (state, action) => {
            state.selectedRoom = action.payload;
        },
        updateBooking: (state, action) => {
            const updatedBooking = action.payload;
            state.bookings = state.bookings.map(booking =>
                booking.id === updatedBooking.id ? updatedBooking : booking
            );
        },
        deleteBooking: (state, action) => {
            const bookingId = action.payload;
            state.bookings = state.bookings.filter(booking => booking.id !== bookingId);
        },
        addBooking: (state, action) => {
            const newBooking = action.payload;
            state.bookings = [...state.bookings, newBooking];
        }
    },
});

export const { setBookings, setBookingSelected, updateBooking, deleteBooking, addBooking } = bookingSlice.actions;
export default bookingSlice.reducer;

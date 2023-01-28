import { createSelector } from 'reselect'

const getBookings = (state: any) => state.bookingState
const updateBooking = (state: any) => state.bookingState

const getBookingsSelector = createSelector(
  [getBookings, updateBooking],
  bookings => bookings
)

export default getBookingsSelector

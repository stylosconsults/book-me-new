import { createSelector } from 'reselect'

const getBookings = (state: any) => state.bookingState

const getBookingsSelector = createSelector([getBookings], bookings => bookings)

export default getBookingsSelector

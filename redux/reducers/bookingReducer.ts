import { BOOKING_SUCCESS, BOOKING_LOADING } from 'redux/actions/types'

const initialState = {}

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action: any) {
  switch (action.type) {
    case BOOKING_SUCCESS:
      return {
        ...state,
        bookings: action.payload,
        loading: false,
      }
    case BOOKING_LOADING:
      return {
        ...state,
        bookings: [],
        loading: action.payload,
      }
    default:
      return state
  }
}

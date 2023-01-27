import { combineReducers } from 'redux'

import bookingReducer from './bookingReducer'
import errorReducer from './errorReducer'
import hotelReducers from './hotelReducers'
import roomReducer from './roomReducer'

export const rootReducer = combineReducers({
  hotelState: hotelReducers,
  roomState: roomReducer,
  bookingState: bookingReducer,
  errors: errorReducer,
})

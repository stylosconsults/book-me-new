import { combineReducers } from 'redux'

import errorReducer from './errorReducer'
import hotelReducers from './hotelReducers'

export const rootReducer = combineReducers({
  hotelState: hotelReducers,
  errors: errorReducer,
})

import { GET_HOTEL_SUCCESS } from 'redux/actions/types'

const initialState = {}

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action: any) {
  switch (action.type) {
    case GET_HOTEL_SUCCESS:
      return {
        ...state,
        hotels: action.payload,
      }
    default:
      return state
  }
}

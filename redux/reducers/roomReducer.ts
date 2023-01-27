import { GET_ROOM_SUCCESS } from 'redux/actions/types'

import { GET_SINGLE_ROOM_SUCCESS } from './../actions/types'

const initialState = {}

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action: any) {
  switch (action.type) {
    case GET_ROOM_SUCCESS:
      return {
        ...state,
        rooms: action.payload,
      }
    case GET_SINGLE_ROOM_SUCCESS:
      return {
        ...state,
        room: action.payload,
      }
    default:
      return state
  }
}

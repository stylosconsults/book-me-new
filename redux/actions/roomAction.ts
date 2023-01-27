import axios from 'axios'
import { trackPromise } from 'react-promise-tracker'

import { getError } from './errorAction'
import { GET_ROOM_SUCCESS, GET_SINGLE_ROOM_SUCCESS } from './types'

const API_URL = process.env.NEXT_PUBLIC_BACKEND_API

export const getRoomSuccess = (author: any) => ({
  type: GET_ROOM_SUCCESS,
  payload: author,
})

export const getSingleRoomSuccess = (author: any) => ({
  type: GET_SINGLE_ROOM_SUCCESS,
  payload: author,
})

export const getRoomsAction = (id: string) => async (dispatch: any) => {
  try {
    const { data } = await trackPromise(
      axios.get(`${API_URL}/rooms?hotel=${id}`)
    )
    dispatch(getRoomSuccess(data))
  } catch (err) {
    dispatch(getError(err))
  }
}

export const getRoomAction = (id: string) => async (dispatch: any) => {
  try {
    const { data } = await trackPromise(axios.get(`${API_URL}/rooms/${id}`))
    dispatch(getSingleRoomSuccess(data))
  } catch (err) {
    dispatch(getError(err))
  }
}

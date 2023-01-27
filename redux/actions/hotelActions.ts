import axios from 'axios'
import { trackPromise } from 'react-promise-tracker'

import { getError } from './errorAction'
import { GET_HOTEL_SUCCESS } from './types'
const API_URL = process.env.NEXT_PUBLIC_BACKEND_API

export const getHotelSuccess = (author: any) => ({
  type: GET_HOTEL_SUCCESS,
  payload: author,
})

export const clearRepos = () => async (dispatch: any) => {
  dispatch(getError([]))
  dispatch(getHotelSuccess([]))
}

export const getHotelsAction = () => async (dispatch: any) => {
  try {
    const { data } = await trackPromise(axios.get(`${API_URL}/hotels`))
    dispatch(getHotelSuccess(data))
  } catch (err) {
    dispatch(getError(err?.toString() || ''))
  }
}

export const getHotelAction = (id: string) => async (dispatch: any) => {
  try {
    const { data } = await trackPromise(axios.get(`${API_URL}/hotels/${id}`))
    dispatch(getHotelSuccess(data))
  } catch (err) {
    dispatch(getError(err?.toString() || ''))
  }
}

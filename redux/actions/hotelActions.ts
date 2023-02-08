/* eslint-disable @typescript-eslint/ban-ts-comment */
import axios from 'axios'
import { trackPromise } from 'react-promise-tracker'

import { getError } from './errorAction'
import { GET_HOTEL_SUCCESS } from './types'
const API_URL = process.env.NEXT_PUBLIC_BACKEND_API

export const getHotelSuccess = (author: any) => ({
  type: GET_HOTEL_SUCCESS,
  payload: author,
})

export const getHotelsAction =
  (
    params = {
      limit: 20,
      name: '',
      page: 1,
    }
  ) =>
  async (dispatch: any) => {
    const query = Object.keys(params)
      .reduce((acc, key) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (params[key]) {
          // @ts-ignore
          acc.push(`${key}=${params[key]}`)
        }
        return acc
      }, [])
      .join('&')
    try {
      const { data } = await trackPromise(
        axios.get(`${API_URL}/hotels?${query}`)
      )
      dispatch(getHotelSuccess(data))
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      dispatch(getError(err?.response?.data.message?.toString() || ''))
    }
  }

export const getHotelAction = (id: string) => async (dispatch: any) => {
  try {
    const { data } = await trackPromise(axios.get(`${API_URL}/hotels/${id}`))
    dispatch(getHotelSuccess(data))
  } catch (err) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dispatch(getError(err?.response?.data.message?.toString() || ''))
  }
}

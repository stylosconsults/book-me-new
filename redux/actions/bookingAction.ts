import axios from 'axios'
import { trackPromise } from 'react-promise-tracker'

import getError from './errorAction'
import { BOOKING_SUCCESS, BOOKING_LOADING } from './types'

const API_URL = process.env.NEXT_PUBLIC_BACKEND_API

export const bookingSuccess = (booking: any) => ({
  type: BOOKING_SUCCESS,
  payload: booking,
})

export const bookingLoading = (payload: boolean) => ({
  type: BOOKING_LOADING,
  payload: payload,
})

export const bookingAction = (bookingdata: any) => async (dispatch: any) => {
  dispatch(bookingLoading(true))
  dispatch(getError(''))
  try {
    const { data } = await trackPromise(
      axios.post(`${API_URL}/bookings`, {
        ...bookingdata,
      })
    )
    dispatch(bookingSuccess(data))
  } catch (err) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dispatch(getError(err?.response?.data.message?.toString() || ''))
    dispatch(bookingLoading(false))
  }
}

export const getBooking = (id: string) => async (dispatch: any) => {
  try {
    const { data } = await trackPromise(axios.get(`${API_URL}/bookings/${id}`))
    dispatch(bookingSuccess(data))
  } catch (err) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dispatch(getError(err?.response?.data.message?.toString() || ''))
    dispatch(bookingLoading(false))
  }
}

export const updateBooking =
  (id: string, bookingdata: any) => async (dispatch: any) => {
    dispatch(bookingLoading(true))
    try {
      const { data } = await trackPromise(
        axios.patch(`${API_URL}/bookings/${id}`, {
          ...bookingdata,
        })
      )
      dispatch(bookingSuccess(data))
    } catch (err) {
      dispatch(bookingLoading(false))
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      dispatch(getError(err?.response?.data.message?.toString() || ''))
    }
  }

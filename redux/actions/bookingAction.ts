import axios from 'axios'

import { pick } from './../../utils/pick'
import getError from './errorAction'
import { BOOKING_SUCCESS } from './types'

const API_URL = process.env.NEXT_PUBLIC_BACKEND_API

export const bookingSuccess = (booking: any) => ({
  type: BOOKING_SUCCESS,
  payload: booking,
})

export const bookingAction =
  (bookingdata: any, autoPay = false) =>
  async (dispatch: any) => {
    try {
      if (autoPay) {
        const paymentData = pick(bookingdata, [
          'amount',
          'name',
          'email',
          'token',
        ])
        alert(paymentData)
        const { data } = await axios.post(`${API_URL}/payments`, bookingdata)
        dispatch(bookingSuccess(data))
      } else {
        const { data } = await axios.post(`${API_URL}/booking`, {
          ...bookingdata,
          status: 'unpayed',
        })
        dispatch(bookingSuccess(data))
      }
    } catch (err) {
      dispatch(getError(err?.toString() || ''))
    }
  }

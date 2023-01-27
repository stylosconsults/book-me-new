import { GET_ERRORS } from './types'

export const getError = (error: any) => ({
  type: GET_ERRORS,
  payload: error,
})

export default getError

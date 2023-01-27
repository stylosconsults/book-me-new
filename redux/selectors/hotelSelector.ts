import { createSelector } from 'reselect'

const getHotels = (state: any) => state.hotelState.hotels

const getHotelsSelector = createSelector([getHotels], hotels => hotels)

export default getHotelsSelector

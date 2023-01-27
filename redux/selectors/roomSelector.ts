import { createSelector } from 'reselect'

const getRooms = (state: any) => state.roomState.rooms

const getRoomsSelector = createSelector([getRooms], rooms => rooms)

const getSingleRoom = (state: any) => state.roomState.room

const getSingleRoomSelector = createSelector([getSingleRoom], room => room)

export { getRoomsSelector, getSingleRoomSelector }

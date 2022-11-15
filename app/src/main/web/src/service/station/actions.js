import StationsApi from 'api/StationsApi'
import { updateInfo } from 'redux/radio'
import { deleteStationEnd, deleteStationStart } from 'redux/station'

const deleteAction = uuid => dispatch => {
	dispatch(deleteStationStart())

	return StationsApi.delete(uuid)
		.then((data) => {			
			dispatch(updateInfo(data))

			dispatch(deleteStationEnd())

			return Promise.resolve()
		})
		.catch(() => {      
			dispatch(deleteStationEnd())

			return Promise.reject()
		})
}

export {
	deleteAction
}
import StationsApi from 'api/StationsApi'
import { updateInfo } from 'redux/radio'
import { 
	deleteStationEnd, 
	deleteStationStart,
	playStationEnd,
	playStationStart,
} from 'redux/station'

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

const playAction = uuid => dispatch => {
	dispatch(playStationStart())

	console.log(uuid)

	return StationsApi.play(uuid)
		.then((data) => {			
			dispatch(updateInfo(data))

			dispatch(playStationEnd())

			return Promise.resolve()
		})
		.catch(() => {      
			dispatch(playStationEnd())

			return Promise.reject()
		})
}

export {
	deleteAction,
	playAction,
}
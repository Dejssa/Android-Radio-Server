import RadioApi from 'api/RadioApi'
import { 
	getInfoStart, 
	getInfoDone, 
	getInfoFail,
	setVolumeDone,
	setVolumeStart,
} from 'redux/radio'

const getRadioInfo = () => dispatch => {
	dispatch(getInfoStart())

	return RadioApi.getState()
		.then((data) => {
			console.log(data)
			
			dispatch(getInfoDone(data))

			return Promise.resolve()
		})
		.catch(() => {      
			dispatch(getInfoFail())

			return Promise.reject()
		})
}

const setRadioVolume = value => dispatch => {
	dispatch(setVolumeStart())

	return RadioApi.setVolume(value)
		.then((data) => {
			console.log(data)
			
			dispatch(setVolumeDone(data))

			return Promise.resolve()
		})
		.catch(() => {      
			dispatch(setVolumeDone())

			return Promise.reject()
		})
}

export {
	getRadioInfo,
	setRadioVolume
}
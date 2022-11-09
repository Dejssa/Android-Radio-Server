const GET_RADIO_INFO_START = 'GET_RADIO_INFO_START'
const GET_RADIO_INFO_DONE = 'GET_RADIO_INFO_DONE'
const GET_RADIO_INFO_FAIL = 'GET_RADIO_INFO_FAIL'

const SET_RADIO_VOLUME_START = 'SET_RADIO_VOLUME_START'
const SET_RADIO_VOLUME_DONE = 'SET_RADIO_VOLUME_DONE'
const SET_RADIO_VOLUME_FAIL = 'SET_RADIO_VOLUME_FAIL'

const getInfoStart = () => ({
	type: GET_RADIO_INFO_START,
})
const getInfoDone = data => ({
	type: GET_RADIO_INFO_DONE,
	data,
})
const getInfoFail = () => ({
	type: GET_RADIO_INFO_FAIL,
})

const setVolumeStart = () => ({
	type: SET_RADIO_VOLUME_START,
})
const setVolumeDone = data => ({
	type: SET_RADIO_VOLUME_DONE,
	data,
})
const setVolumeFail = () => ({
	type: SET_RADIO_VOLUME_FAIL,
})

export default (state = {}, action) => {
	switch (action.type) {
	case GET_RADIO_INFO_START:
		return { fetching: true	}
	case GET_RADIO_INFO_DONE:
		return {
			data: action.data,
			fetching: false
		}
	case GET_RADIO_INFO_FAIL:
		return { fetching: false }

	case SET_RADIO_VOLUME_START:
		return { fetching: true	}
	case SET_RADIO_VOLUME_DONE:
		return {
			data: action.data,
			fetching: false
		}
	case SET_RADIO_VOLUME_FAIL:
		return { fetching: false }

	default:
		return state
	}
}

export {
	getInfoStart,
	getInfoDone,
	getInfoFail,

	setVolumeStart,
	setVolumeDone,
	setVolumeFail,
}
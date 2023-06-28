const DELETE_STATION_START = 'DELETE_STATION_START'
const DELETE_STATION_END = 'DELETE_STATION_END'

const PLAY_STATION_START = 'PLAY_STATION_START'
const PLAY_STATION_END = 'PLAY_STATION_END'

const deleteStationStart = () => ({
	type: DELETE_STATION_START,
})
const deleteStationEnd = data => ({
	type: DELETE_STATION_END,
	data,
})

const playStationStart = () => ({
	type: PLAY_STATION_START,
})
const playStationEnd = data => ({
	type: PLAY_STATION_END,
	data,
})

export default (state = {}, action) => {
	switch (action.type) {
	case DELETE_STATION_START:
		return { fetching: true	}
	case DELETE_STATION_END:
		return { fetching: false }
	case PLAY_STATION_START:
		return { fetching: true	}
	case PLAY_STATION_END:
		return { fetching: false }

	default:
		return state
	}
}

export {
	deleteStationStart,
	deleteStationEnd,
	playStationStart,
	playStationEnd,
}
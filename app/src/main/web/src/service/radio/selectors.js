import { createSelector } from 'reselect'

const getRadioVolume = createSelector(
	state => state.radio.data, 
	info => info?.Volume 
)

const getRadioPlayingStation = createSelector(
	state => state.radio.data, 
	info => info?.StationInfo
)

const getRadioStations = createSelector(
	state => state.radio.data, 
	info => info?.Stations || []
)

export {
	getRadioVolume,
	getRadioPlayingStation,
	getRadioStations,
}
import { List } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { getRadioStations } from 'service/radio/selectors'
import StationRow from './StationRow/StationRow'

const StationsList = () => {

	const stations = useSelector(getRadioStations)

	return (
		<List rowGap={2}>
			{stations.map(item => <StationRow station={item} />)}
		</List>
	)
}

export default StationsList
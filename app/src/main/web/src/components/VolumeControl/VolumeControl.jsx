import React, { useCallback, useMemo, useState } from 'react'
import {
	Stack,
	Slider,
} from '@mui/material'
import { 
	VolumeDown, 
	VolumeMute, 
	VolumeOff, 
	VolumeUp,
} from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { getRadioVolume } from 'service/radio/selectors'
import { setRadioVolume } from 'service/radio/actions'
import { useEffect } from 'react'

const VolumeControl = () => {
	const [value, setValue] = useState(-1)

	const dispatch = useDispatch()
	const setVolume = useCallback(value => dispatch(setRadioVolume(value)), [])

	const serverRadioVolume = useSelector(getRadioVolume)

	useEffect(() => {
		if (value === -1 && serverRadioVolume) {
			setValue(serverRadioVolume)
		}
	}, [serverRadioVolume])

	const volumeValue = useMemo(() => value === -1 ? 0 : value, [value])

	const Icon = useMemo(() => {
		if (value < 3) {
			return VolumeOff
		} else if (value < 25) {
			return VolumeMute
		} else if (value < 50) {
			return VolumeDown
		} else {
			return VolumeUp
		} 
	}, [value])

	const handleOnChange = useCallback((event, value)=> {
		const oldValue = value

		setValue(value)
		setVolume(value)
			.then(() => {}) 
			.catch(() => setValue(oldValue))
	}, [])

	return (
		<Stack direction={'row'} columnGap={2} alignItems='center' width={'100%'}>
			<Icon/>
			<Slider 
				value={volumeValue} 
				onChange={handleOnChange}
			/>
		</Stack>
	)
}

export default VolumeControl
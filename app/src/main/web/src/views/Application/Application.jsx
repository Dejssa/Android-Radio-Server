import { makeStyles } from '@mui/styles'
import React, { useEffect } from 'react'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { getRadioInfo } from 'service/radio/actions'
import StationInfo from 'views/StationInfo'
import StationsList from 'views/StationsList'
import styles from './styles'
const useStyles = makeStyles(styles)

const Application = () => {
	const classes = useStyles()
	const dispatch = useDispatch()

	const getStartRadioInfo = useCallback(() => dispatch(getRadioInfo()), [dispatch])

	useEffect(() => {
		getStartRadioInfo()
	}, [])

	return (
		<div className={classes.container}>
			<StationsList/>
			<StationInfo/>
		</div>
	)
}

export default Application

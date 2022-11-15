import { makeStyles } from '@mui/styles'
import Footer from 'components/Footer'
import Header from 'components/Header'
import React, { useEffect } from 'react'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { getRadioInfo } from 'service/radio/actions'
import Content from 'views/Content'
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
			<Header />
			<Content />
			<Footer />
		</div>
	)
}

export default Application

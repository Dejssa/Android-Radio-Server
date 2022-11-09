import React from 'react'
import {
	Grid,
	Typography,
	Container,
	Stack,
} from '@mui/material'
import styles from './styles'
import { makeStyles } from '@mui/styles'
import { PlayArrow, Refresh } from '@mui/icons-material'
import VolumeControl from './VolumeControl'
import IconButton from 'components/IconButton'
import { useSelector } from 'react-redux'
import { getRadioPlayingStation } from 'service/radio/selectors'
import { useMemo } from 'react'

const useStyles = makeStyles(styles)

const Footer = () => {
	const classes = useStyles()

	const currentyStationInfo = useSelector(getRadioPlayingStation)

	const stationName = useMemo(() => {
		if (currentyStationInfo) {
			return currentyStationInfo.Title
		}

		return 'No station selected'
	}, [currentyStationInfo])

	return (
		<Container maxWidth="lg">
			<Grid container alignItems={'center'}>
				<Grid item md={3}>
					<Stack direction={'row'} columnGap={2} alignItems={'center'}>
						<IconButton size='small'>
							<Refresh/>
						</IconButton>
						<Typography >
							{stationName}
						</Typography>
					</Stack>
				</Grid>
				<Grid item container md={6} justifyContent='center'>
					<IconButton>
						<PlayArrow />
					</IconButton>
				</Grid>
				<Grid item md={3}>
					<VolumeControl/>
				</Grid>
			</Grid>
		</Container>
	)
}

export default Footer

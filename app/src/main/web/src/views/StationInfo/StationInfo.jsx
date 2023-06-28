import React, { useEffect, useMemo } from 'react'
import bgImage from 'assets/bg.png'
import { 
	IconButton,
	Stack, 
	Tooltip, 
	Typography,
} from '@mui/material'
import styled from '@emotion/styled'
import { Favorite, FavoriteOutlined } from '@mui/icons-material'
import VolumeControl from 'components/VolumeControl'
import StateButton from './StateButton'
import { getRadioCurrentState } from 'service/radio/selectors'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

const BgImage = styled('div')(() => ({
	backgroundImage: `url(${bgImage})`,
	display: 'flex',
	flexDirection: 'column',
	backgroundSize: 'cover',
}))



const StationInfo = () => {
	const { t } = useTranslation(['current'])

	const favorite = useMemo(() => true, [])
	const playingState = useSelector(getRadioCurrentState)
	
	useEffect(() => {

	}, [])

	const favoriteIcon = useMemo(() => {
		if (favorite) {
			return (
				<Tooltip title={t('current:favorite.off')}>
					<Favorite htmlColor='white' />
				</Tooltip>
			)
		}

		return (
			<Tooltip title={t('current:favorite.on')}>
				<FavoriteOutlined htmlColor='white' />
			</Tooltip>
		)
	}, [favorite, t])

	return (
		<BgImage>
			<div style={{height: '100%'}} />
			<div style={{
				background: '#262227f2',
				height: 'max-content',
				display: 'grid',
				gridTemplateColumns: '75% 25%',
				padding: 32,
			}}>
				<Stack gap={4}>
					<Typography variant='h6'>
						{t('current:playing', {name: 'Radio rock'})}
					</Typography>
					<StateButton 
						state={playingState.IsPlaying}
						station={playingState.StationInfo}
					/>
				</Stack>
				<Stack gap={4} alignItems='end'>
					<IconButton style={{color: '#000'}}>
						{favoriteIcon}
					</IconButton>
					<VolumeControl/>
				</Stack>
			</div>
		</BgImage>
	)
}

StationInfo.propTypes = {

}

StationInfo.defaultProps = {

}

export default StationInfo

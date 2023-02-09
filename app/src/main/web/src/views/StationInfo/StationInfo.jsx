import React, { useEffect } from 'react'
import bgImage from 'assets/bg.png'
import { Button, IconButton, Stack, Typography } from '@mui/material'
import styled from '@emotion/styled'
import { Favorite, Pause } from '@mui/icons-material'
import VolumeControl from 'components/VolumeControl'

const BgImage = styled('div')(() => ({
	backgroundImage: `url(${bgImage})`,
	display: 'flex',
	flexDirection: 'column',
	backgroundSize: 'cover',
}))

const ButtonStyled = styled(Button)(() => ({
	'&.MuiButton-root':{
		width: 'max-content',
		borderRadius: 24,
	}
}))

const StationInfo = () => {
	useEffect(() => {

	}, [])

	return (
		<BgImage>
			<div style={{height: '100%'}}>
    
			</div>
			<div style={{
				background: '#262227f2',
				height: 'max-content',
				display: 'grid',
				gridTemplateColumns: '75% 25%',
				padding: 32,
			}}>
				<Stack gap={4}>
					<Typography variant='h6'>
            Now playing: Radio rock
					</Typography>
					<ButtonStyled 
						variant='contained'
						startIcon={<Pause/>}
					>
            Pause
					</ButtonStyled>
				</Stack>
				<Stack gap={4} alignItems='end'>
					<IconButton style={{color: '#000'}}>
						<Favorite htmlColor='white' />
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

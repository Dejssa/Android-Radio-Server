import { 
	Delete, 
	Edit, 
	PlayArrow,
	QuestionMark,
} from '@mui/icons-material'
import { 
	IconButton,
	ListItem,
	ListItemIcon,
	ListItemText,
	Avatar,
	Zoom,
} from '@mui/material'
import { styled } from '@mui/styles'
import React, {useMemo} from 'react'
import { useCallback } from 'react'
import { useState } from 'react'

const PlayButton = styled(IconButton)(() => ({
	'&.MuiButtonBase-root': {
		position: 'absolute'
	}
}))

const StationRow = ({ station }) => {
	const [hovered, setHovered] = useState(false)
	
	const handleOnHoverEnter = useCallback(() => setHovered(true), [])
	const handleOnHoverLeave = useCallback(() => setHovered(false), [])

	return (
		<ListItem 
			onMouseEnter={handleOnHoverEnter}
			onMouseLeave={handleOnHoverLeave}
		>
			<ListItemIcon>
				<Avatar>
					<QuestionMark />
					<Zoom in={hovered}>
						<PlayButton 
							size='small' 
							variant='contained'
						>
							<PlayArrow fontSize='small' />
						</PlayButton>
					</Zoom>
				</Avatar>
			</ListItemIcon>
			<ListItemText>
				{station.Title}
			</ListItemText>
			<IconButton size='small' variant='text'>
				<Edit color='primary' />
			</IconButton>
			<IconButton size='small' variant='text'>
				<Delete color='error'/>
			</IconButton>
		</ListItem>
	)
}

export default StationRow
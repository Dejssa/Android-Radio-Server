import { 
	Delete, 
	Edit, 
	PlayArrow,
	QuestionMark,
} from '@mui/icons-material'
import PropTypes from 'prop-types'
import { 
	IconButton,
	ListItem,
	ListItemIcon,
	ListItemText,
	Avatar,
	Zoom,
} from '@mui/material'
import { styled } from '@mui/styles'
import React, { useCallback } from 'react'
import { useState } from 'react'

const PlayButton = styled(IconButton)(() => ({
	'&.MuiButtonBase-root': {
		position: 'absolute'
	}
}))

const StationRow = ({ station, onDelete }) => {
	const [hovered, setHovered] = useState(false)
	
	const handleOnHoverEnter = useCallback(() => setHovered(true), [])
	const handleOnHoverLeave = useCallback(() => setHovered(false), [])

	const handleOnDeleteClick = useCallback(() => onDelete(station), [onDelete, station])

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
			<IconButton size='small' variant='text' onClick={handleOnDeleteClick}>
				<Delete color='error'/>
			</IconButton>
		</ListItem>
	)
}

StationRow.propTypes = {
	onDelete: PropTypes.func.isRequired,
}

StationRow.defaultProps = {

}

export default StationRow
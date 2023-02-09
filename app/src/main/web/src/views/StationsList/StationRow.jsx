import { 
	MoreVert, 
	PlayArrow,
	QuestionMark,
} from '@mui/icons-material'
import PropTypes from 'prop-types'
import { 
	IconButton,
	ListItem,
	ListItemText,
	Avatar,
	Zoom,
	Card,
} from '@mui/material'
import { styled } from '@mui/styles'
import React, { useCallback } from 'react'
import { useState } from 'react'
import theme from 'theme'

const PlayButton = styled(IconButton)(() => ({
	'&.MuiButtonBase-root': {
		position: 'absolute'
	}
}))

const StationCard = styled(Card)(() => ({
	'&.MuiCard-root': {
		width: '100%',
		height: 60,
		display: 'grid',
		gridTemplateColumns: '60px calc(100% - 100px) 40px',
		alignItems: 'center',
		backgroundColor: '#fdfce9',
		'& > .MuiAvatar-root': {
			height: 60,
			width: 60,
			borderRadius: 0,
			background: '#d6eb70',
			color: theme.palette.primary.dark
		}
	}
}))

const StationTitle = styled('div')(() => ({
	paddingInline: 16,
	overflow: 'hidden',
	textOverflow: 'ellipsis',
	overflowWrap: 'break-word',
	display: 'block',
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
			<StationCard>
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
				<StationTitle>
					<ListItemText style={{ 
						whiteSpace: 'nowrap',
					}}>
						{station.Title}
					</ListItemText>
				</StationTitle>
				<IconButton size='small' variant='text'>
					<MoreVert/>
				</IconButton>
			</StationCard>
		</ListItem>
	)
}

StationRow.propTypes = {
	onDelete: PropTypes.func.isRequired,
}

StationRow.defaultProps = {

}

export default StationRow
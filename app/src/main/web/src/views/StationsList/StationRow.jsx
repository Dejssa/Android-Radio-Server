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
import React, { useCallback, useMemo } from 'react'
import { useState } from 'react'
import theme from 'theme'
import CustomerMenu from 'components/CustomerMenu'
import AlertDialog from 'dialogs/AlertDialog'
import { useTranslation } from 'react-i18next'
import Translation from 'components/Translation'

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

const StationRow = ({ station, onPlay, onDelete }) => {
	const { t } = useTranslation(['stations', 'common'])

	const [hovered, setHovered] = useState(false)
	const [menuAnchor, setMenuAnchor] = useState(false)
	const [deleteDialogState, setDeleteDialogState] = useState(false)
	
	const handleOnHoverEnter = useCallback(() => setHovered(true), [])
	const handleOnHoverLeave = useCallback(() => setHovered(false), [])

	const handleOnDeleteClick = useCallback(() => onDelete(station), [onDelete, station])

	const handleOnPlay = useCallback(() => {
		onPlay(station)
	}, [onPlay, station])

	const handleOnOpen = useCallback(event => {
		setMenuAnchor(event.target)
	}, [])

	const handleOnMenuClose = useCallback(() => {
		setMenuAnchor(null)
	}, [])

	const handleOnDeleteStart = useCallback(() => setDeleteDialogState(true), [])
	const handleOnDeleteCancel = useCallback(() => setDeleteDialogState(false), [])
	const handleOnDeleteConfirm = useCallback(() => {
		setDeleteDialogState(false)

	}, [])

	const menuOptions = useMemo(() => [{
		id: 'edit',
		title: t('common:edit'),
		onClick: () => {}
	}, {
		id: 'delete',
		title: t('common:delete'),
		onClick: handleOnDeleteStart
	}], [handleOnDeleteStart, t])

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
							onClick={handleOnPlay}
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
				<IconButton 
					size='small' 
					variant='text'
					onClick={handleOnOpen}
				>
					<MoreVert/>
				</IconButton>
				<CustomerMenu
					anchorEl={menuAnchor}
					options={menuOptions}
					onClose={handleOnMenuClose}
				/>
				<AlertDialog
					title={t('stations:dialog.delete.title')}
					title={t('stations:dialog.delete.title')}
					description={(
						<Translation
							t={t}
							text={'stations:dialog.delete.description'}
							values={{ name: station.Title }}
						/>
					)}
					open={deleteDialogState}
					onCancel={handleOnDeleteCancel}
					onConfirm={handleOnDeleteConfirm}
				/>
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
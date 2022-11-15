import { List } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRadioStations } from 'service/radio/selectors'
import StationRow from './StationRow/StationRow'
import AlertDialog from 'dialogs/AlertDialog'
import { useTranslation } from 'react-i18next'
import { deleteAction } from 'service/station/actions'

const StationsList = () => {
	const { t } = useTranslation('text')

	const [deleteDialogOpen, setDeleteDialogOpen] = useState(null)
	const [selectedStation, setSelectedStation] = useState(null)

	const dispatch = useDispatch()

	const dispatchDeleteRequest = useCallback(item => dispatch(deleteAction(item.UUID)), [dispatch])
	
	const stations = useSelector(getRadioStations)
	
	const handleOnDelete = useCallback(item => {
		setSelectedStation(item)
		setDeleteDialogOpen(true)
	}, [])
	
	const handleOnCancel = useCallback(() => setDeleteDialogOpen(false), [])

	const handleOnDialogClose = useCallback(() => setSelectedStation(null), [])

	const handleOnDialogConfirm = useCallback(() => {
		dispatchDeleteRequest(selectedStation)
		setDeleteDialogOpen(false)
	}, [dispatchDeleteRequest, selectedStation])

	return (
		<>
			<List rowGap={2}>
				{stations.map(item => (
					<StationRow 
						station={item} 
						onDelete={handleOnDelete}
					/>
				))}
			</List>
			<AlertDialog 
				title={t('station.dialog.delete.title')}
				description={t('station.dialog.delete.description', { station: selectedStation?.Title })}
				open={deleteDialogOpen} 
				onConfirm={handleOnDialogConfirm}
				onCancel={handleOnCancel}
				onClose={handleOnDialogClose}
				isDeleteConfirmation
			/>
		</>
	)
}

export default StationsList
import React from 'react'
import PropTypes from 'prop-types'
import { 
	Button, 
	Dialog, 
	DialogActions,
	DialogContent,
	DialogTitle,
	Typography,
} from '@mui/material'
import { useTranslation } from 'react-i18next'

const AlertDialog = ({ title, description, onClose, onCancel, onConfirm, open, isDeleteConfirmation }) => {
	const { t } = useTranslation('text')

	return (
		<Dialog onClose={onClose} open={open}>
			<DialogTitle>
				{title}
			</DialogTitle>
			<DialogContent>
				<Typography>
					{description}
				</Typography>
			</DialogContent>
			<DialogActions>
				<Button 
					variant={isDeleteConfirmation ? 'contained' : 'text'} 
					onClick={onCancel}
				>
					{t('common.cancel')}
				</Button>
				<Button 
					variant={isDeleteConfirmation ? 'text' : 'contained'} 
					color={isDeleteConfirmation ? 'error' : 'primary'}
					onClick={onConfirm}
				>
					{t('common.confirm')}
				</Button>
			</DialogActions>
		</Dialog>
	)
}

AlertDialog.propTypes = {
	title: PropTypes.string.isRequired, 
	description: PropTypes.string.isRequired, 
	onClose: PropTypes.func.isRequired,
	onCancel: PropTypes.func.isRequired,
	onConfirm: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired,
	selectedValue: PropTypes.string.isRequired,
	isDeleteConfirmation: PropTypes.bool
}

AlertDialog.defaultProps = {
	isDeleteConfirmation: false
}

export default AlertDialog
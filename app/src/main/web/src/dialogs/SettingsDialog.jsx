import React, { useState, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import { 
	Stack,
	Button, 
	Dialog,
	DialogActions, 
	DialogContent,
	DialogTitle,
	Grid, 
	TextField, 
	Typography,
	MenuItem,
} from '@mui/material'
import { useTranslation } from 'react-i18next'

const SettingsDialog = ({ open, onClose, onCancel, onConfirm }) => {
	const { t, i18n } = useTranslation('text')

	console.log(i18n.options.languages)

	const languagesOptions = useMemo(() => i18n.options.languages.map(code => (
		<MenuItem key={code} value={code}>
			{t(`settings.language.options.${code}`)}
		</MenuItem>
	)), [i18n.options.languages, t])

	const handleOnLanguageChange = useCallback(event => {
		i18n.changeLanguage(event.target.value)
	}, [i18n])

	return (
		<Dialog onClose={onClose} open={open} fullWidth>
			<DialogTitle>
				{t('settings.title')}
			</DialogTitle>
			<DialogContent>
				<Stack>
					<Typography variant='h6'>
          Browser settings
					</Typography>
					<Grid container>
						<Grid item md={6}>

						</Grid>
						<Grid item md={6}>
							<TextField
								label={t('settings.language.title')}
								value={i18n.language}
								onChange={handleOnLanguageChange}
								fullWidth
								select
							>
								{languagesOptions}
							</TextField>
						</Grid>
					</Grid>
				</Stack>

			</DialogContent>
			<DialogActions>
				<Button 
					variant='text'
					onClick={onCancel}
				>
					{t('common.cancel')}
				</Button>
				<Button 
					variant='contained'
					onClick={onConfirm}
				>
					{t('common.confirm')}
				</Button>
			</DialogActions>
		</Dialog>
	)
}

SettingsDialog.propTypes = {

}

SettingsDialog.defaultProps = {

}

export default SettingsDialog

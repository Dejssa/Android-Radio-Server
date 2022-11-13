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
	InputAdornment,
} from '@mui/material'
import { useTranslation } from 'react-i18next'

const SettingsDialog = ({ open, onClose, onCancel, onConfirm }) => {
	const { t, i18n } = useTranslation('text')

	const languagesOptions = useMemo(() => i18n.options.languages.map(code => (
		<MenuItem key={code} value={code}>
			{t(`settings.browser.language.options.${code}`)}
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
				<Stack rowGap={2}>
					<Typography variant='h6'>
						{t('settings.browser.title')}
					</Typography>
					<Grid container spacing={2}>
						<Grid item md={6}>
							<TextField
								label={t('settings.browser.refresh.title')}
								value={20}
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											{t('settings.browser.refresh.time')}
										</InputAdornment>
									),
								}}
								fullWidth
							/>
						</Grid>
						<Grid item md={6}>
							<TextField
								label={t('settings.browser.language.title')}
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
	open: PropTypes.bool,
	onClose: PropTypes.func.isRequired,
	onCancel: PropTypes.func.isRequired,
	onConfirm: PropTypes.func.isRequired,
}

SettingsDialog.defaultProps = {
	open: false,
}

export default SettingsDialog

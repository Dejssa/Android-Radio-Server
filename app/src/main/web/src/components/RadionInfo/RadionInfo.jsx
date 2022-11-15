import React, { useCallback, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import {
	Typography, 
	Stack, 
	IconButton,
	Tooltip,
} from '@mui/material'
import { Settings } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'

function RadionInfo({ onOpenSettingsDialog  }) {
	const { t } = useTranslation('text')

	const info = {
		name: 'Radio server - 304',
	}

	return (
		<Stack
			direction="row"
			width="max-content"
			alignItems="center"
			columnGap={2}
		>
			<Typography >
				{info.name}
			</Typography>
			<Tooltip title={t('settings.title')}>
				<IconButton size='small' onClick={onOpenSettingsDialog}>
					<Settings sx={{color: 'white'}}/>
				</IconButton>
			</Tooltip>
		</Stack>
	)
}

RadionInfo.propTypes = {
	onOpenSettingsDialog: PropTypes.func.isRequired,
}

RadionInfo.defaultProps = {

}

export default RadionInfo

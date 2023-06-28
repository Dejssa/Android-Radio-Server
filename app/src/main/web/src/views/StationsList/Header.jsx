import React, { useState, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import { IconButton, Stack } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Settings } from '@mui/icons-material'
import { common } from '@mui/material/colors'
import SettingsDialog from 'dialogs/SettinsDialog/SettingsDialog'

const Header = () => {
	const [settingsState, setSettingsState] = useState(false)

	const { t } = useTranslation()

	const title = useMemo(() => 'Radio server 304', [])

	const handleOnSettingsOpen = useCallback(() => setSettingsState(true), [])
	const handleOnSettingsClose = useCallback(() => setSettingsState(false), [])

	return (
		<>
			<Stack
				direction="row"
				justifyContent={'space-between'}
			>
				{title}
				<IconButton onClick={handleOnSettingsOpen}>
					<Settings htmlColor={common.white}/>
				</IconButton>
			</Stack>
			<SettingsDialog 
				open={settingsState}
				onCancel={handleOnSettingsClose}
			/>
		</>
	)
}

Header.propTypes = {

}

Header.defaultProps = {

}

export default Header

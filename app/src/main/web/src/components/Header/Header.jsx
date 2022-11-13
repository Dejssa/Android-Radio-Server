import React from 'react'
import {
	AppBar,
	Toolbar,
	Container,
	Stack,
} from '@mui/material'
import RadionInfo from 'components/RadionInfo'
import ApplicationInfo from 'components/ApplicationInfo'
import styles from './styles'
import { makeStyles } from '@mui/styles'
import SettingsDialog from 'dialogs/SettingsDialog'
import { useState } from 'react'
import { useCallback } from 'react'
const useStyles = makeStyles(styles)


const Header = () => {
	const classes = useStyles()

	const [settingsDialogOpen, setSettingsDialogOpen] = useState(false)

	const handleOnOpenSettingsDialog = useCallback(() => setSettingsDialogOpen(true), [])
	const handleOnCancelSettingsDialog = useCallback(() => setSettingsDialogOpen(false), [])

	return (
		<>
			<AppBar classes={{
				root: classes.appBar
			}}>
				<Toolbar>
					<Container maxWidth="lg">
						<Stack direction={'row'} justifyContent='space-between'>
							<RadionInfo onOpenSettingsDialog={handleOnOpenSettingsDialog} />
							<ApplicationInfo/>
						</Stack>
					</Container>
				</Toolbar>
			</AppBar>
			<SettingsDialog 
				open={settingsDialogOpen}
				onCancel={handleOnCancelSettingsDialog}
			/>
		</>
	)
}

export default Header

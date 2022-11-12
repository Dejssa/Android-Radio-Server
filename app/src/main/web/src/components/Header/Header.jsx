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
const useStyles = makeStyles(styles)


function Header() {
	const classes = useStyles()

	return (
		<AppBar classes={{
			root: classes.appBar
		}}>
			<Toolbar>
				<Container maxWidth="lg">
					<Stack direction={'row'} justifyContent='space-between'>
						<RadionInfo />
						<ApplicationInfo/>
					</Stack>
				</Container>
			</Toolbar>
		</AppBar>
	)
}

export default Header

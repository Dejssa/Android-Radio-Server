import React from 'react'
import {
	Box,
	AppBar,
	Toolbar,
	Divider,
	Typography,
	Container,
	Stack,
	Tabs,
	Tab,
	useMediaQuery,
} from '@mui/material'
import { Book, Person } from '@mui/icons-material'
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

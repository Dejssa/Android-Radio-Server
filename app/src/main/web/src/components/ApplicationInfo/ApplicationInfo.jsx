import React from 'react'
import { 
	Typography,
	Stack,
} from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub'
import styles from './styles'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(styles)

function ApplicationInfo() {
	const classes = useStyles()

	const info = {
		version: '1.0.0'
	}

	return (
		<Stack 
			direction="row"
			width="max-content"
			alignItems="center"
			columnGap={2}
		>
			<Typography >
				{info.version}
			</Typography>
			<a
				className={classes.gitIcon} 
				href="https://github.com/Dejssa/Android-Radio-Server"
				target="_blank" 
				rel="noreferrer">
				<GitHubIcon/>
			</a>
		</Stack>
	)
}

export default ApplicationInfo

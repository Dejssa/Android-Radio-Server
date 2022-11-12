import React from 'react'

import { 
	Container,
	Card,
	Stack,
	Button,
} from '@mui/material'
import { makeStyles, styled } from '@mui/styles'

import styles from './styles'
import StationsList from 'components/StationsList'

const useStyles = makeStyles(styles)

const AddButton = styled(Button)(() => ({
	'&.MuiButtonBase-root': {
		margin: 16
	}
}))

const Content = () => {
	const classes = useStyles()


	return (
		<div className={classes.container}>
			<Container maxWidth='lg'>
				<Card>
					<Stack>
						<AddButton variant='dashed'>
							Add
						</AddButton>
						<StationsList/>
					</Stack>
				</Card>
			</Container>
		</div>
	)
}

export default Content
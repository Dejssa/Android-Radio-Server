import React from 'react'
import PropTypes from 'prop-types'
import {
	Button,
} from '@mui/material'
import sx from './styles'

const sizes = ['small', 'medium']

const IconButton = ({ size, children }) => {
	return (
		<Button 
			sx={sx.button[size]}
			variant='contained'
		>
			{children}
		</Button>
	)
}

IconButton.propTypes = {
	/** The size of the component. `small` is equivalent to the dense button styling. */
	size: PropTypes.oneOf(sizes),
	children: PropTypes.node.isRequired,
}

IconButton.defaultProps = {
	size: sizes[1],
}

export default IconButton
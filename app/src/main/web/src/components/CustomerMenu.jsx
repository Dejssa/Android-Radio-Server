import React, { useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Menu, MenuItem } from '@mui/material'

const CustomMenuItem = ({ item, onCloseMenu }) => {
	const handleOnClick = useCallback(() => {
		item.onClick()
		onCloseMenu()
	}, [item, onCloseMenu])
	
	return (
		<MenuItem 
			id={item.id} 
			key={item.id} 
			onClick={handleOnClick}
		>
			{item.title}
		</MenuItem>
	)
}

const CustomerMenu = ({anchorEl, options, onClose}) => {
	const menuOptions = useMemo(() => options.map(item => (
		<CustomMenuItem 
			key={item.id} 
			item={item}
			onCloseMenu={onClose}
		>
			{item.title}
		</CustomMenuItem>
	)), [onClose, options])
  
	return (
		<Menu 
			open={Boolean(anchorEl)} 
			anchorEl={anchorEl}
			onClose={onClose}
		>
			{menuOptions}
		</Menu>
	)
}

CustomerMenu.propTypes = {
	anchorEl: PropTypes.node.isRequired,
	options: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		onClick: PropTypes.func.isRequired,
	})),
	onClose: PropTypes.func.isRequired,
}

CustomerMenu.defaultProps = {
	options: []
}

export default CustomerMenu

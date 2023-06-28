import React, { useState, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Pause, PlayArrow } from '@mui/icons-material'
import { Button } from '@mui/material'
import styled from '@emotion/styled'
import { useTranslation } from 'react-i18next'

const ButtonStyled = styled(Button)(() => ({
	'&.MuiButton-root':{
		width: 'max-content',
	}
}))

const StateButton = ({station, state}) => {
	const { t } = useTranslation(['current'])

	const info = useMemo(() => {
		if (state && station) {
			return {
				title: t('current:state.pause'),
				icon: Pause
			}
		} 

		return {
			title: t('current:state.play'),
			icon: PlayArrow
		} 
	}, [state, station, t])

	return (
		<ButtonStyled
			variant='contained'
			startIcon={<info.icon/>}
		>
			{info.title}
		</ButtonStyled>
	)
}

StateButton.propTypes = {

}

StateButton.defaultProps = {

}

export default StateButton

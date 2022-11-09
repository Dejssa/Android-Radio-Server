import React, { useCallback, useRef, useState } from 'react'
import Edit from '@mui/icons-material/Edit'
import {
	Typography, 
	Stack, 
	Slide, 
	Button,
} from '@mui/material'

function RadionInfo() {
	const [showEdit, setShowEdit] = useState(false)

	const containerRef = useRef()

	const info = {
		name: 'Radio server - 304',
	}

	const handleOnHoverEnter = useCallback(() => setShowEdit(true), [])
	const handleOnHoverLeave = useCallback(() => setShowEdit(false), [])

	return (
		<Stack
			direction="row"
			width="max-content"
			alignItems="center"
			columnGap={2}
			onMouseEnter={handleOnHoverEnter}
			onMouseLeave={handleOnHoverLeave}
		>
			<Typography >
				{info.name}
			</Typography>
			<div ref={containerRef} style={{ overflow: 'hidden' }}>
				<Slide
					in={showEdit}
					direction="right"
					container={containerRef.current}
				>
					<Button 
						sx={{ color: 'white', textTransform: 'capitalize' }}
						endIcon={<Edit />}
					>
            Edit
					</Button>
				</Slide>
			</div>
		</Stack>
	)
}

export default RadionInfo

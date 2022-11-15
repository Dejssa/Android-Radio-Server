import { common } from '@mui/material/colors'
import { createTheme, responsiveFontSizes } from '@mui/material/styles'

const applicationTheme = createTheme({
	palette: {
		primary:{
			dark:'#2c387e',
			main:'#3f51b5',
			light:'#6573c3',
		},
		font: {
			main: '#01124f',
		},
		status: {
			online: 'green',
			offline: 'red',
		},
	},
	typography: {
		fontFamily: 'Montserrat,sans-serif',
		fontSize: 16,
	},
	components: {
		
	}
})

applicationTheme.components = {
	MuiIconButton: {
		variants: [
			{
				props: { variant: 'contained' },
				style: {
					background: applicationTheme.palette.primary.main,
					color: common.white,
					boxShadow: applicationTheme.shadows[2],
					':hover': {
						background: applicationTheme.palette.primary.light,
					}
				},
			},
		],
		styleOverrides: {
			sizeSmall: {
				maxWidth: 32,
				width: 32,
				maxHeight: 32,
				height: 32,
			},
			sizeMedium: {
				maxWidth: 48,
				width: 48,
				maxHeight: 48,
				height: 48,
			}
		},
	},
	MuiButton: {
		variants: [
			{
				props: { variant: 'dashed' },
				style: {
					textTransform: 'none',
					border: `2px dashed ${applicationTheme.palette.primary.main}`,
					color: applicationTheme.palette.primary.main,
					':hover': {
						borderColor: applicationTheme.palette.primary.light,
						color: applicationTheme.palette.primary.light,
					}
				},
			}
		]
	}
}

const theme = responsiveFontSizes(applicationTheme)

export default theme

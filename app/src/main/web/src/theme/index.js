import { common } from '@mui/material/colors'
import { createTheme, responsiveFontSizes } from '@mui/material/styles'

const applicationTheme = createTheme({
	palette: {
		primary:{
			main:'#597463',
		},
		font: {
			main: '#01124f',
		},
		status: {
			online: 'green',
			offline: 'red',
		},
		text: {
			primary: '#000',
			secondary: '#000'
		}
	},
	typography: {
		fontFamily: 'Montserrat,sans-serif',
		fontSize: 16,
	},
	components: {
		
	}
})

applicationTheme.components = {
	MuiButton: {
		styleOverrides: {
			root: {
				borderRadius: applicationTheme.spacing(8),
			}
		}
	},
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
			},
		},
	},
}

const theme = responsiveFontSizes(applicationTheme)

export default theme

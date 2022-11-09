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
})

applicationTheme.components = {
	...applicationTheme.components,
}

const theme = responsiveFontSizes(applicationTheme)

export default theme

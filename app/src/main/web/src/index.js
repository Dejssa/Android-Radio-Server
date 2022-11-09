import React from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@mui/material/styles'
import store from './redux/store'
import { Provider } from 'react-redux'

import applicationTheme from './theme'
import Application from './views/Application'


const container = document.getElementById('root')

const root = createRoot(container)

root.render((
	<ThemeProvider theme={applicationTheme}>
		<Provider store={store}>
			<Application />
		</Provider>
	</ThemeProvider>
))

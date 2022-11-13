import React from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@mui/material/styles'
import store from './redux/store'
import { Provider } from 'react-redux'

import applicationTheme from './theme'
import Application from './views/Application'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n'

const container = document.getElementById('root')

const root = createRoot(container)

root.render((
	<ThemeProvider theme={applicationTheme}>
		<I18nextProvider i18n={i18n}>
			<Provider store={store}>
				<Application />
			</Provider>
		</I18nextProvider>
	</ThemeProvider>
))

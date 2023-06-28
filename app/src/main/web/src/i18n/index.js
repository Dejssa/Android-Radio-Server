import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import byBY from './byBY'
import byLT from './byLT'
import enUS from './enUS'

import 'moment/locale/nl'

i18n
	.use(initReactI18next)
	.init({
		languages: ['en-US', 'by-BY', 'by-LT'],
		lng: 'by-BY',
		debug: true,
		resources: {
			'en-US': enUS,
			'by-BY': byBY,
			'by-LT': byLT,
		},
		interpolation: {
			escapeValue: false,
		},
	})

export default i18n

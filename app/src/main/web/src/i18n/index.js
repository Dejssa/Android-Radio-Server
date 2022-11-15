import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from './en'
import pl from './pl'
import by from './by'

import 'moment/locale/nl'

i18n
	.use(initReactI18next)
	.init({
		languages: ['en-US', 'pl-PL', 'by-BY'],
		lng: 'en-US',
		debug: true,
		resources: {
			en: { text: en },
			pl: { text: pl },
			by: { text: by },
		},
		interpolation: {
			escapeValue: false,
		},
	})

export default i18n

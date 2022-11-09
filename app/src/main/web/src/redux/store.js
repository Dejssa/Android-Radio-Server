import { configureStore } from '@reduxjs/toolkit'

import radio from './radio'

const store = configureStore({
	reducer:{
		radio
	}
})

export default store

import { requestPost, requestGet } from './Api'

export default {
	play: () => requestPost('radio/play').then(response => response.json()),
	pause: () => requestPost('radio/pause').then(response => response.json()),
	getState: () => requestGet('radio/state').then(response => response.json()),
	setVolume: Percentage => requestPost('radio/volume/level', { Percentage }).then(response => response.json()),
}

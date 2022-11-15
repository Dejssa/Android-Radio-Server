import { requestPost, requestGet } from './Api'

export default {
	play: (UUID) => requestPost('radio/play/station', { UUID }).then(response => response.json()),
	delete: (UUID) => requestPost('station/delete', { UUID }).then((response) => response.json())
}

// const serverURL = window.location.href
// const serverURL = 'http://192.168.1.45:8080/'
const serverURL = 'http://192.168.1.102:8080/'

const headers = {
	Accept: 'application/json',
	'Content-Type': 'application/json',
}

const requestPost = (path, body) => {
	const options = {
		method: 'post',
		headers,
		body: JSON.stringify(body),
	}

	return fetch(`${serverURL}${path}`, options)
}

const requestGet = (path) => {
	const options = {
		method: 'post',
		headers,
	}

	return fetch(`${serverURL}${path}`, options)
}

export {
	requestPost,
	requestGet,
}
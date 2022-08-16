const serverURL = window.location.href
// const serverURL = "http://192.168.1.102:8080"
const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

// ============================================
// 							BASE API REQUESTS
// ============================================

function _request_post(path, body) {
  const options = {
    method: "post",
    headers,
    body: JSON.stringify(body)
  }

  return fetch(`${serverURL}/${path}`, options)
}

function _request_get(path) {
  const options = {
    method: "post",
    headers,
  }

  return fetch(`${serverURL}/${path}`, options)
}

// ============================================
// 									REQUESTS
// ============================================


const playCurrentStation = () => _request_post('current/play')
  .then(response => response.json())

const stopCurrentStation = () => _request_post('current/stop')
  .then(response => response.json())

const loadCurrentStation = () => 			_request_get('station/current')
  .then(response => response.json())

const updateRadioVolume = (Percentage) =>	_request_post('volume/level', { Percentage })


const playStationByUUID = (UUID) => _request_post('station/play', { UUID })

const deleteStationByUUID = (UUID) =>	_request_post('station/delete', { UUID })
  .then(response => response.json())

const saveNewStation = (URL, Title) => _request_post('station/save', { URL, Title })
  .then(response => response.json())
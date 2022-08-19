// const serverURL = window.location.href
const serverURL = "http://192.168.1.8:8080/"
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
}

// ============================================
// 							BASE API REQUESTS
// ============================================

function _request_post(path, body) {
  const options = {
    method: "post",
    headers,
    body: JSON.stringify(body),
  }

  return fetch(`${serverURL}${path}`, options)
}

function _request_get(path) {
  const options = {
    method: "post",
    headers,
  }

  return fetch(`${serverURL}${path}`, options)
}

// ============================================
// 									REQUESTS
// ============================================

// ================= PLAYER ===================

const apiRadioPlay = () => _request_post("radio/play").then((response) => response.json())

const apiRadioPause = () => _request_post("radio/pause").then((response) => response.json())

const apiRadioGetState = () => _request_get("radio/state").then((response) => response.json())

const apiRadioVolumeSet = (Percentage) => _request_post("radio/volume/level", { Percentage })

const apiRadioPlayStationByUUID = (UUID) =>
  _request_post("radio/play/station", { UUID }).then((response) => response.json())

// ============= SELECTED STATION =============

const apiStationSave = (URL, Title) => _request_post("station/save", { URL, Title }).then((response) => response.json())

const apiStationDeleteByUUID = (UUID) => _request_post("station/delete", { UUID }).then((response) => response.json())

// ============= IMPORT / EXPORT ==============

const exportStations = () => _request_get("stations/export").then((response) => response.json())

const importStations = (data) => _request_post("stations/import", data).then((response) => response.json())

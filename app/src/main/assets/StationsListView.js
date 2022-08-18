const emptyListIcon = `<svg viewBox="0 0 24 24">
  <circle cx="15.5" cy="9.5" r="1.5"></circle>
  <circle cx="8.5" cy="9.5" r="1.5"></circle>
  <circle cx="15.5" cy="9.5" r="1.5"></circle>
  <circle cx="8.5" cy="9.5" r="1.5"></circle>
  <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-2.5c2.33 0 4.32-1.45 5.12-3.5h-1.67c-.69 1.19-1.97 2-3.45 2s-2.75-.81-3.45-2H6.88c.8 2.05 2.79 3.5 5.12 3.5z"></path>
</svg>`

const deleteStationIcon = `<svg viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg>`
const playStationIcon = `<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg>`

const validateNewRadio = (url, title) => {
  if (url.length === 0) {
    return "Empty URL"
  }

  if (title.length === 0) {
    return "Empty title"
  }

  return null
}

const saveStationInfo = () => {
  const URL = document.getElementById("radio_url").value
  const Title = document.getElementById("radio_title").value

  const validation = validateNewRadio(URL, Title)
  if (validation) {
    showNotification(validation)

    return
  }

  saveNewStation(URL, Title).then((data) => renderStationsList(data))
}

function deleteSelectedStation(uuid) {
  deleteStationByUUID(uuid).then((data) => renderStationsList(data))
}

function renderStationRow(stationInfo) {
  const container = document.createElement("div")
  container.className = "station_row"

  const deleteButton = document.createElement("button")
  deleteButton.onclick = () => deleteSelectedStation(stationInfo.UUID)
  deleteButton.className = "delete_button icon"
  deleteButton.innerHTML = deleteStationIcon

  const title = document.createElement("span")
  title.className = "station_row_title"
  title.append(deleteButton)
  title.append(stationInfo.Title)

  const playButton = document.createElement("button")
  playButton.onclick = () => playStationByUUID(stationInfo.UUID)
  playButton.className = "player_button"
  playButton.innerHTML = playStationIcon

  container.append(title)
  container.append(playButton)

  return container
}

function renderStationsList(stations) {
  const stationsContainer = document.getElementById("stations_list")

  if (stations.length === 0) {
    const emptyView = document.createElement("div")
    emptyView.className = "empty_view"

    const emptyViewIcon = document.createElement("div")
    emptyViewIcon.className = "empty_view_icon"
    emptyViewIcon.innerHTML = emptyListIcon

    const emptyViewLabel = document.createElement("p")
    emptyViewLabel.className = "body1 empty_view_label"
    emptyViewLabel.append("Currenlty there is no stations.")
    emptyViewLabel.append(document.createElement("br"))
    emptyViewLabel.append("What are you waiting for? Add the first one!")

    emptyView.append(emptyViewIcon)
    emptyView.append(emptyViewLabel)

    stationsContainer.innerHTML = ""
    stationsContainer.append(emptyView)
  } else {
    stationsContainer.innerHTML = ""
    stations.forEach((station) => stationsContainer.append(renderStationRow(station)))
  }
}

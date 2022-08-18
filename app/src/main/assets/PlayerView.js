const volumeMuteIcon = `<svg focusable="false" aria-hidden="true" viewBox="0 0 24 24">
  <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4 9.91 6.09 12 8.18V4z"/>
</svg>`

const volumeLowIcon = `<svg viewBox="0 0 24 24"><path d="M7 9v6h4l5 5V4l-5 5H7z"></path></svg>`

const volumeDownIcon = `<svg viewBox="0 0 24 24">
  <path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z"></path>
</svg>`

const volumeMaxIcon = `<svg focusable="false" aria-hidden="true" viewBox="0 0 24 24">
  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
</svg>`

const playerPlayIcon = `<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg>`
const playerPauseIcon = `<svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path></svg>`

let _playerState = {}

function loadStationInfo() {
  loadCurrentStation().then(updateStationInfo)
}

function updateVolume(event) {
  updateRadioVolume(event.target.value)
}

function togglePlayStatus() {
  if (_playerState.IsPlaying) {
    stopCurrentStation().then(updateStationInfo)
  } else {
    playCurrentStation().then(updateStationInfo)
  }
}

function updateStationInfo(data) {
  _playerState = data

  document.getElementById("radio_volume").value = _playerState.Volume || 0
  document.getElementById("current_station_title").innerText = _playerState.StationInfo.Title || "No station selected"

  renderStationsList(_playerState.Stations)
  renderVolumeIcon(_playerState.Volume || 0)
  renderPlayerButton(_playerState.IsPlaying)
}

function renderVolumeIcon(value) {
  const volumeIcon = document.getElementById("volume_level_icon")

  if (value < 3) {
    volumeIcon.innerHTML = volumeMuteIcon
  } else if (value < 25) {
    volumeIcon.innerHTML = volumeLowIcon
  } else if (value < 50) {
    volumeIcon.innerHTML = volumeDownIcon
  } else {
    volumeIcon.innerHTML = volumeMaxIcon
  }
}

function renderPlayerButton(isPlaying) {
  const playerButton = document.getElementById("player_button")

  if (isPlaying) {
    playerButton.innerHTML = playerPauseIcon
  } else {
    playerButton.innerHTML = playerPlayIcon
  }
}

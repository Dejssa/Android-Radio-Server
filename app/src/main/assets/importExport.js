function exportStationsList() {
  exportStations().then((listData) => {
    const blob = new Blob([JSON.stringify(listData)], { type: "text/plain" })
    const link = document.createElement("a")

    link.download = "Radio server: 304 - stations list.radiojson"
    link.href = window.URL.createObjectURL(blob)
    link.click()
  })
}

function importStationsList(event) {
  if (typeof event === "object") {
    const files = event.target.files

    if (files.length === 0) {
      showNotification("No file selected")
    }

    // TODO json struct validation required.
    files[0]
      .text()
      .then((stationsList) => importStations(JSON.parse(stationsList)))
      .then(renderStationsList)
      .catch(() => {})
  }
}

function startImportStationsList() {
  const importStationsFileInput = document.getElementById("import_file_selector")
  importStationsFileInput.click()
}

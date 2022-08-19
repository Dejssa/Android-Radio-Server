# Android radio Changelog

## [unrealeased 0.1.0]

### Added
* Store stations in database

### Changed
* Split server in server,handler,provider,repository

### Fixed
* Station play button color
* Spacing between station rows

## [0.0.3]

### Added
* Include file to simplify loading of new web files
* Link to git
* Static radio name
* Dynamic volume icon (3%, 25%, 50%, 100%)
* Import/Export of stored stations

### Changed
* UI
  * Header now only the application info
    * Radio name
    * Current version
    * Link to git project
    * Link to changelog
    * User login or logged user info
  * Content
    * Empty list view
  * Footer contains all station controls
    * Refresh radio state
    * Current station info
    * Play/stop button
    * Volume controls
* Move stations render functions in separate file

### Fixed
* Last removed station keeps be in the list
* Minor performance improvemt. Target request path comparison works as a direct string compare instead of contains function

### Removed
* Separate play/stop buttons
* Mute button

## [0.0.2]

### Added
* Add staion
* Delete station
* Play station
* Stop control
* Base view
* Change device volume

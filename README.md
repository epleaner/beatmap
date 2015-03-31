Beatmap
=======

Music Discovery and Information Aggretator
------------------------------------------

Beatmap is an exploration into available music services and what combining them can accomplish.
Built on Backbone.js and Marionette.js

### To start
`npm install`

`bower install`

`grunt`

### Currently supports
* Last.fm recommendations
* Spotify links
* YouTube lookup


### TODO
* Bugs:
	* Grooveshark search includes "full album"
	* Escape search links (no '&')
	* Have all links open in new tab/window
	* Track list scroll broken
* Increase "more" quantity
* Routes/URL hashes
	* search
* Color scheme
	* blue/green/purple
	* #89C4F4 
	* http://paletton.com/#uid=53u0u0kp1Zo1M+QfSZ3DRYwU6un
* Pandora API
	* Start radio
* Streamus API
	* Add songs to queue
* Infinite Scroll
* Basic UI
	* favicon
	* color scheme
	* album details animation
* Search by album
* Scraping rateyourmusic
	* weigh recommendations based on RYM rank
* Echonest API
	- weigh recommendations
* Beatmap API
	- like album
	- dislike/hide album
* Backend
	- local storage and server storage
	- making/sharing playlists 
* Playlist saving
	- echonest/native -> export to lastfm/spotify
* Youtube iframe
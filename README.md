# volumio-mqtt
NodeJS MQTT Adapter for volumio.org Player


# Configure
Copy config.js.sample to config.js and adjust your settings. 
config.js is in the gitignore list and will not be overwritten. 


# MQTT Topics:

Setters:

- {devicename}/set/volume/percent       0 - 100
- {devicename}/set/volume/mute          true | false
- {devicename}/set/volume/push          + | -

- {devicename}/set/play
- {devicename}/set/stop
- {devicename}/set/pause

Getters: 

- {devicename}/get/status
- {devicename}/get/browsesources
- {devicename}/get/browselibrary
- {devicename}/get/multiroomdevices

Status responses:

- {devicename}/status/connected         true | false
- {devicename}/status/info
- {devicename}/status/browsesources
- {devicename}/status/browselibrary
- {devicename}/status/multiroomdevices


Volumio player API reference
https://volumio.github.io/docs/API/WebSocket_APIs.html

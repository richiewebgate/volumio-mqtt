# volumio-mqtt
NodeJS MQTT adapter for volumio.org music player, to control your player using MQTT messages.

For example, if you have configured your mqtt_devicename in config.js to "player-01", you can control it by sending MQTT messages to topic "player-01/set/play" to start playback, or "player-01/set/volume/percent" and a payload of 50 to set volume to 50%.

# Installation

First clone the repo into a directory of your choice (e.g. /opt/node/)

$ git clone https://github.com/richiewebgate/volumio-mqtt.git

Then go into the volumio-mqtt directory and install dependencies

$ npm install

# Configuration
Copy config.js.sample to config.js and adjust your settings:
Define mqtt_devicename (the prefix for mqtt messages) and mqttHost with the address of your mqtt broker.

config.js is listed in the .gitignore list and will not be overwritten when you pull from the git repository. 

At this point you could start volumio-mqtt using node for a test run, but since you want it to automatically start after each reboot, you should install the PM2 process manager. 

# Install PM2 process manager
Optional: You can use PM2 to run this script automatically on each reboot.

$ sudo npm install pm2 -g

$ pm2 startup

[PM2] Init System found: systemd

[PM2] To setup the Startup Script, copy/paste the following command:

sudo env PATH=$PATH:/bin /lib/node_modules/pm2/bin/pm2 startup systemd -u volumio --hp /home/volumio


$ pm2 start pm2-process.json

$ pm2 list 

$ pm2 save


# MQTT Topics:

Setters:

  Topic                                | (Payload)

- {devicename}/set/volume/percent       (0 - 100)
- {devicename}/set/volume/mute          (true | false)
- {devicename}/set/volume/push          (+ | -)
- {devicename}/set/volume/up
- {devicename}/set/volume/down

- {devicename}/set/power                (true | false)
- {devicename}/set/play                 Optional: Number of track in queue to play
- {devicename}/set/addPlay              {"service": "webradio", "title": radioURI, "uri": url}
- {devicename}/set/stop
- {devicename}/set/pause

- {devicename}/set/seek                 (seconds)
- {devicename}/set/playPlaylist


Getters: 

- {devicename}/get/status
- {devicename}/get/browsesources
- {devicename}/get/browselibrary
- {devicename}/get/multiroomdevices

Status responses:

- {devicename}/status/connected
- {devicename}/status/info
- {devicename}/status/volume
- {devicename}/status/browsesources
- {devicename}/status/browselibrary
- {devicename}/status/multiroomdevices


Volumio player API reference
https://volumio.github.io/docs/API/WebSocket_APIs.html


Additional options in config.js:

- mqtt_tvenabledtopic:
You can configure the volumio playback to stop when you turn on your TV (or by any other device, e.g. on an incoming phone call) by specifying a topic name to listen for. The device will listen on MQTT for the specified topic and stop playback (assuming your TV will send out an MQTT message on power up). Currently limited to a single MQTT topic name.

- mqtt_powerToggleAddr:
You can configure to emit an MQTT message on play and stop of volumio by specifying an outgoing MQTT topic name in "mqtt_powerToggleAddr". This can be used to turn on/off a power outlet (e.g. your amplifier). Currently limited to a single MQTT topic.


Additional project contributors: morphZ
// This is a device discovery definition sample, to add Volumio as a device in Alexa SmartHome V3 Skill
// Supported actions: Play, Pause, Stop, Change channel, Volume up/down

// In the Smarthome skill, forward all received actions to AWS IoT Hub. 
// Create a node.js bridge to connect and forward messages from AWS IoT Hub to your local MQTT broker, 
// where volumio-mqtt listens for those messages.

function getDevices() {
    var devices = [
    	{
    		endpointId: 'volumio-01',
            manufacturerName: 'Volumio.io',
            version: 'VER01',
            friendlyName: 'volumio',
    		description: 'Volumio music player',
    		cookie: {},
    		displayCategories: [ 'RADIO' ],
    		capabilities: [ 
                {
    				"interface": "Alexa.ChannelController",
    				"type": "AlexaInterface",
    				"version": "3",
    				"properties": { 
    				    "supported": [{ "name": "channel"} ],
                        "proactivelyReported": false,
                        "retrievable": false
                    }
    			},
    		    {
                    "type": "AlexaInterface",
                    "interface": "Alexa.PowerController",
                    "version": "3",
                    "properties": {
                      "supported": [ { "name": "powerState" } ],
                      "proactivelyReported": false,
                      "retrievable": false
                    }
                }, 
    		    {
                    "type":"AlexaInterface",
                    "interface":"Alexa.Speaker",
                    "version":"1.0",
                    "properties":{ "supported":[ {"name":"volume"}, {"name":"muted"}] }
                },
    			{
    				"interface": "Alexa.PlaybackController",
                    "type": "AlexaInterface",
                    "version": "3",
    				"supportedOperations" : ["Play", "Pause", "Stop", "FastForward"]
    			}
    		]
    	}
    ];
    
    return devices;
};

exports.getDevices = getDevices;
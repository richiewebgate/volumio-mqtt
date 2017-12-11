var version = "2017-12-10 13:28";
var config = require('./config');
var mqtt = require('mqtt');
var io=require('socket.io-client');
var socket= io.connect(config.volumio_host);

var mqttClient = mqtt.connect(config.mqttHost);

mqttClient.subscribe(config.mqtt_devicename+"/set/#");
mqttClient.subscribe(config.mqtt_devicename+"/get/#");
mqttClient.subscribe(config.mqtt_tvenabledtopic);

mqttClient.on('message', function (topic, rawMessage) {
    var msg = rawMessage.toString();
    if (config.debug) console.log("[MQTT] Received topic:" + topic.toString(), msg);

    if (topic===config.mqtt_tvenabledtopic) {
        // Turn off radio player when TV is turned on
        if (msg==="true") socket.emit('stop');
        return;
    }

    var arr = topic.split('/');
    var action = arr[2];
    if (arr[1]=="set") {        
        if (action==="volume") { // numeric value between 0 and 100, mute, umute, +, -
            if (arr[3]==="percent") {
                console.log("[MQTT] setVolume", msg);
                socket.emit('volume', Number(msg) );
            } else if (arr[3]==="mute") { // true | false
                socket.emit('volume', msg==="true"?"mute":"umute" );
            } else if (arr[3]==="push") { // + | -
                socket.emit('volume', msg );
            } else if (arr[3]==="up") {
                socket.emit('volume', "+" );
            } else if (arr[3]==="down") {
                socket.emit('volume', "-" );
            }
        } else if (action=="play") {
            socket.emit('play');
        } else if (action=="pause") {
            socket.emit('pause');
        } else if (action=="stop") {
            socket.emit('stop');
        } else if (action=="power") {
            socket.emit( msg==="true"?'play':'stop');
        }
    } else if (arr[1]==="get") {
        if (arr[2]==="status") {
            socket.emit('getState');      
        } else if (arr[2]==="multiroomdevices") {
            socket.emit('getMultiRoomDevices');
        } else if (arr[2]==="browsesources") {
            socket.emit('getBrowseSources');
        }
    }
});
socket.on('connect', function(){
    console.log("["+config.mqtt_devicename+"] Connected");
    mqttClient.publish(config.mqtt_devicename+"/status/connected", "true", { retain: false });
});
socket.on('disconnect', function(){
    console.log("["+config.mqtt_devicename+"] Disconnected");
    mqttClient.publish(config.mqtt_devicename+"/status/connected", "false", { retain: false });
});
socket.on('pushState', function(data){
    mqttClient.publish(config.mqtt_devicename+"/status/info", JSON.stringify(data), { retain: false });
});
socket.on('pushMultiRoomDevices', function(data){
    mqttClient.publish(config.mqtt_devicename+"/status/multiroomdevices", JSON.stringify(data), { retain: false });
});
socket.on('pushBrowseSources', function(data){
    mqttClient.publish(config.mqtt_devicename+"/status/browsesources", JSON.stringify(data), { retain: false });
});
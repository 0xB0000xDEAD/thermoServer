// var mongo = require('mongodb');
// var monk = require('monk');

import monk from 'monk'
import mosca from 'mosca'
import {
  functionDeclaration
} from 'babel-types';

var mosca_db = monk('localhost:27017/mqtt'); // questo è ildatabase a cui si accede
mosca_db.then(() => {
  console.log('mosca database is online')
})


/*********mosca settings *********/


var ascoltatore = {
  //using ascoltatore
  type: 'mongo',
  url: 'mongodb://localhost:27017/mqtt',
  pubsubCollection: 'ascoltatori',
  mongo: {}
};

var moscaSettings = {
  port: 1883,
  backend: ascoltatore,
  persistence: {
    factory: mosca.persistence.Mongo,
    url: 'mongodb://localhost:27017/mqtt'
  }
};

/*********mosca settings end  *********/

/********data model *********/
//dummy
var message = {
  topic: 'topic1',
  payload: 'payload dummy ', // or a Buffer
  qos: 0, // 0, 1, or 2
  retain: false // or true
};





const server = new mosca.Server(moscaSettings);



server.on('ready', init);
let dummyId;

server.on('clientConnected', function (client) {
  console.log('client connected', client.id);
  dataModel.name = client.id
  ThermoNode.create(dataModel)

});


import {
  ThermoNode
} from '../../api/thermoNode/index'

// fired when a message is received
server.on('published', function (packet, client) {
  console.log('Published', packet.payload.toString());
  var events = mosca_db.get('events');
  events.insert({
    message: packet.payload.toString()
  });

  dataModel.name = packet.payload.toString();



  ThermoNode.findById(dummyId).then(function (node) {
    node ? Object.assign(thermoNode, dataModel).save() : null;
  }).catch(err => console.log(err));

});


let dataModel = {
  name: '',
  status: false,
  temp: 0
}

// fired when the mqtt server is ready
function init() {
  console.log('Mosca server is up and running');
  // console.log('path di mosca è :' +server.path);
  // console.log('port di mosca è :' +server.port);
  // console.log('port di mosca è :' +server.address);

  //console.log(message);
  var useDummy = 0;
  if (useDummy) {
    for (i = 0; i < 5; i++) {
      server.publish(message, function () {
        console.log('mqtt message nr. ' + i + 'published in ' + message.topic);
      });
    }
  }
}
export default mosca_db

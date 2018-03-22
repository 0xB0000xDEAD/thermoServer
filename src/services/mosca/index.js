// var mongo = require('mongodb');
// var monk = require('monk');

import monk from 'monk'
import mosca from 'mosca'

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

server.on('clientConnected', function (client) {
  console.log('client connected', client.id);
});

// fired when a message is received
server.on('published', function (packet, client) {
  console.log('Published', packet.payload);
  var events = mosca_db.get('events'); // qui sta il tutto events è una collection
  events.insert({
    message: packet
  });

});


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

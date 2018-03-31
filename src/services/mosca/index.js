import monk from 'monk'
import mosca from 'mosca'
// import {
//   functionDeclaration
// } from 'babel-types';
import {
  ThermoNode
} from '../../api/thermoNode/index'
import utils from '../../utils/utils'
import _ from 'lodash'

var mosca_db = monk('localhost:27017/mqtt'); // questo è ildatabase a cui si accede
mosca_db.then(() => {
  console.log('Mosca db is online');
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
let message = {
  topic: 'topic1',
  payload: 'payload dummy ', // or a Buffer
  qos: 0, // 0, 1, or 2
  retain: false // or true
};

const server = new mosca.Server(moscaSettings);

server.on('ready', init);

server.on('clientConnected', function (client) {
  console.log('client connected', client.id);
  // console.log(client); // more to explre here


  ThermoNode.count({
    name: client.id
  }, function (err, count) {
    if (err) {
      console.log('error');
    }
    // console.log(count);
    if (count > 0) {
      console.log('client already in the db');
      console.log(`Welcome back ${client.id}`);

    } else {
      //create the model
      let dataModel = {
        name: client.id,
        status: false,
        temp: []
      } //TODO: abstarct in a Schema
      ThermoNode.create(dataModel);
      console.log('client added to the db');
    }
    // console.log('there are %d client', count);
  });
});

// fired when a message is received
//console.log('Published', packet.payload.toString());

server.on('published', function (packet, client) {
  // console.log(packet);
  // console.log(client); // undefined, second argoment dont exist

  let now = new Date;

  if (packet.topic.toString().endsWith('pool')) {
    let node = _.truncate(packet.payload.toString(), {
      length: 7,
      omission: ''
    });
    let value = packet.payload.toString().substring(9);

    console.log(`Tx from : ${node} =======> ${value}`);

    let query = {
      name: node
    };
    let tmp = [];
    ThermoNode.findOne(query,
      'temp',

      function (err, result) {
        if (err) {

        } else {
          // console.log(result);
          console.log(result.temp);
          // tmp = result.temp
          tmp = 666;
          console.log(tmp);
        }
      })


    ThermoNode.findOneAndUpdate(query, {
      // temp: utils(parseInt(packet.payload.toString(), 10))
      // temp: utils(packet.payload.toString().substring(9)) // truncate node** part of the payload 
      temp: tmp.push(packet.payload.toString().substring(9))
    }, {
      new: true
    }, function (err, result) {
      if (err) {
        console.log('error :-(');
      } else {
        // console.log(result);
        // console.log(now.toISOString());
      }

    })
  } else {
    //console.log(packet); // other transmissions
  }
  // var events = mosca_db.get('events');
  // events.insert({
  //   message: packet.payload.toString()
  // });   
});


// fired when the mqtt server is ready
function init() {
  // console.log('Mosca server is up and running');
  // console.log('path di mosca è :' +server.path);
  // console.log('port di mosca è :' +server.port);
  // console.log('port di mosca è :' +server.address);

  var useDummy = 0;
  if (useDummy) { // mock control transmission
    for (i = 0; i < 5; i++) {
      server.publish(message, function () {
        console.log('mqtt message nr. ' + i + 'published in ' + message.topic);
      });
    }
  }
}
export default mosca_db

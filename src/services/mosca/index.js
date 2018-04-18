import {
  mongo
} from '../../config'
import monk from 'monk'
import mosca from 'mosca'
import {
  ThermoNode
} from '../../api/thermoNode/index'
import utils from '../../utils/utils'
import _ from 'lodash'

console.log(mongo.uri);


var mosca_db = monk(mongo.uri); // questo è ildatabase a cui si accede
mosca_db.then(() => {
  console.log('Mosca db is online');
})


/*********mosca settings *********/


var ascoltatore = {
  //using ascoltatore
  type: 'mongo',
  url: mongo.uri,
  pubsubCollection: 'ascoltatori',
  mongo: {}
};

var moscaSettings = {
  port: 1883,
  backend: ascoltatore,
  persistence: {
    factory: mosca.persistence.Mongo,
    url: mongo.uri,
  },
  // mqtt over websocket setting
  http: {
    port: 3000,
    bundle: true,
    static: './'
  }
};

/*********mosca settings end  *********/

/********data model *********/
let message = {
  topic: 'dummy_pool',
  payload: 'payload dummy ', // or a Buffer
  qos: 1, // 0, 1, or 2
  retain: true // false or true
};

const server = new mosca.Server(moscaSettings);

server.on('ready', init);

server.on('clientConnected', function (client) {
  console.log('client connected', client.id);
  // console.log(client); // more to explore here


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
let tmp = [];

server.on('published', function (packet, client) {
  // console.log(packet);
  // console.log(client); // undefined, second argoment dont exist


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
    ThermoNode.findOne(query,
      'temp',

      function (err, result) {
        if (err) {
          console.log('something went wrong with the query');

        } else {
          if (!result) {

          } else {
            if (result.temp.length < 12) {
              result.temp.push(packet.payload.toString().substring(9))
            } else {
              result.temp.splice(0, 1);
              result.temp.push(packet.payload.toString().substring(9))
            }
            ThermoNode.findOneAndUpdate(query, {
              temp: result.temp
            }, {
              new: true,
            }, function (err, result) {
              result.temp = utils(packet.payload.toString().substring(9)) // truncate node** part of the payload 
  
            })
          }

        }
      })



    // ThermoNode.findOneAndUpdate(query, {
    //   // temp: utils(parseInt(packet.payload.toString(), 10))
    //   temp: utils(packet.payload.toString().substring(9)) // truncate node** part of the payload 
    //   // temp: tmp.push(packet.payload.toString().substring(9)) //push return the new length of array !!!
    // }, {
    //   new: true
    // }, function (err, result) {
    //   if (err) {
    //     console.log('error :-(');
    //   } else {
    //     // console.log(result);
    //     // console.log(now.toISOString());
    //   }

    // })
  } else {
    //console.log(packet); // other transmissions
  }
  // var events = mosca_db.get('events');
  // events.insert({
  //   message: packet.payload.toString()
  // });   
});

function getIntRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

// fired when the mqtt server is ready
function init() {
  console.log('Mosca server is up and running');
  // console.log('path di mosca è :' + server.path);
  // console.log('port di mosca è :' + server.port);
  // console.log('port di mosca è :' + server.address);

  function getRandName() {
    let name = "";
    for (let index = 0; index < 7; index++) {
      name = name.concat(getIntRandom(0, 9)); // implicit conversion
    }
    // console.log(name);

    return name;
  };
  class Dummy {
    constructor(name) {
      this.dataModel = {
        name: name,
        status: false,
        temp: []
      } //TODO: abstarct in a Schema
      ThermoNode.create(this.dataModel);
      console.log(`fake client (${this.dataModel.name}) added to the db`);
    }
  }
  const useDummy = 1;

  if (useDummy) {
    const dummyArray = [];
    for (let index = 0; index < 1; index++) {
      let dummyId = getRandName();
      dummyArray.push(dummyId);
      new Dummy(dummyId);
    }

    // mock control transmission

    setInterval(() => {
      for (const dummy of dummyArray) {
        message.payload = `${dummy}**${(function (min, max) {
          min = Math.ceil(min);
          max = Math.floor(max);
          return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
        })(0, 40)}`
        server.publish(message, function () {
          console.log('faked transmission in ' + message.topic);
        });
      }

    }, 15000)

  }
}
export default mosca_db

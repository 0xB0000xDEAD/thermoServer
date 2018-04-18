import {
  Router
} from 'express'
import model from '../thermoNode/model'
const router = new Router();
router.get('/', function (req, res) {
  res.render('dash', {
    title: 'dashboard'
  });
});

let graphDots = [];

// router.get('/test', function (req, res, next) {

//   model.find({
//     name: 'esp3210c40a24'
//   }, 'temp', function (err, result) {
//     if (err) {
//       // return console.log(err);
//             console.log(err);

//     } else {if (result.length>0) {
//     //console.log('%s created at %s.', result.name, result.status) // Space Ghost is a talk show host.
//     //console.log('la ricerca ritorna un: ', typeof(result));
//     console.log(result[0].temp);

//     graphDots = result[0].temp;

//     // graphDots = result.map(value => parseFloat(value.temp));
//     // graphDots = result.filter((entry) => {
//     //   return entry != NaN
//     // }).map(value => parseFloat(value.temp));
//     // console.log(graphDots);
//     }else {
//       console.log('Sorry... model not found');
//     }
//     }
//   })

//   const data = {
//     otherData: 'something else',
//     dots: graphDots,
//     dummy: [1, 2, 9, 4, 5, 4, 5, 6, 7, 6, -3, 8, 9]
//   };
//   // const methods = {
//   //   click: function () {
//   //     this.otherData = "You Clicked The button and change otherData";
//   //   },
//   //   reset: function() {
//   //     console.log("model resetted!!!");
//   //   },
//   //   greet: function(event) {
//   //     // `this` inside methods points to the Vue instance
//   //     alert('Hello ' + this.name + '!')
//   //     // `event` is the native DOM event
//   //     if (event) {
//   //       alert(event.target.tagName)
//   //     }
//   //   }
//   // }
//   const vueOptions = {

//     head: {
//       title: 'Hello this is a overwrite',
//     }
//   }
//   res.renderVue('test', data, vueOptions); //test.vue file in @/views
// });
export default router

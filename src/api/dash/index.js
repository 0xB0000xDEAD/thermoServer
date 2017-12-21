import {
  Router
} from 'express'
import model from '../thermoNode/model'
const router = new Router();
router.get('/', function(req, res) {
  res.render('dash', {
    title: 'dashboard'
  });
});

function reset() {
  model.find(function(err, result) {
    for (i == 0; i++; i < result.lenght) {
      //model.delete()  // tiro ad indovinare
    }
  })
};
router.get('/test', function(req, res, next) {
  let dataBlob = [];
  model.find({
    name: 'salotto'
  }, 'temp', function(err, result) {
    if (err) return console.log(err);
    //console.log('%s created at %s.', result.name, result.status) // Space Ghost is a talk show host.
    //console.log(result);
    console.log(typeof(result));
    console.log(Object.entries(result));
    dataBlob = Object.entries(result);
  })
  const data = {
    otherData: 'something else',
    graphDot: function() {
      const dots = Object.entries(dataBlob).map(value => value[2])
      return dots;
    },
    dummy: [1, 2, 3, 4, 5, 4, 5, 6, 7, 6, 7, 8, 9]
  };
  const vueOptions = {
    head: {
      title: 'express-vue test',
      meta: []
    }
  }
  res.renderVue('test', data, vueOptions); //test.vue file in @/views
});
export default router

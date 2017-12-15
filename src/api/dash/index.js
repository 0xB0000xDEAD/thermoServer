import {
  Router
} from 'express'
import {
  middleware as query
} from 'querymen'
//import test from './chart'

const router = new Router()

router.get('/', function(req, res) {
  res.render('dash', {
    title: 'dashboard'
  });
  //console.log('fattissimo')
  //test();
})
router.get('/test', function(req, res, next) {
  const data = {
    otherData: 'something else'
  };
  const vueOptions = {
    head: {
      title: 'express-vue test',
      meta: []
    }
  }
  res.renderVue('test', data, vueOptions); //test.vue file in @/views
})



export default router

import {Router} from 'express'
import {
  middleware as query
} from 'querymen'
import test from './chart'

const router = new Router()

router.get('/', function(req, res) {
  res.render('dash', {
    title: 'dashboard'
  });
  //console.log('fattissimo')
  test()

  }
)
export default router

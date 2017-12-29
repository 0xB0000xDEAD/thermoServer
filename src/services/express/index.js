import express from 'express'
import cors from 'cors'
import compression from 'compression'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import {
  errorHandler as queryErrorHandler
} from 'querymen'
import {
  errorHandler as bodyErrorHandler
} from 'bodymen'
import {
  env
} from '../../config'
//aggiunta
import mosca_db from '../mosca'
import path from 'path'
export default (apiRoot, routes) => {
  const app = express()
  /*** express-vue ***/
  var expressVue = require('express-vue')
  const vueOptions = {
    rootPath: path.join(__dirname, '../../views'),
    layout: {
      start: '<div id="app">',
      end: '</div>'
    }
  }
  //console.log(vueOptions.rootPath);
  const expressVueMiddleware = expressVue.init(vueOptions);
  app.use(expressVueMiddleware);


  //ssr vue
  const Vue = require('vue')
  const renderer = require('vue-server-renderer').createRenderer()
  //import ssr from ()

  // view engine setup
  app.set('view engine', 'pug');
  app.set('views', './src/views');
  //inserire prima delle routes
  //Make our db accessible to our router
  app.use(function(req, res, next) {
    req.db = mosca_db;
    next();
  });
  /*


   // from api 4 ex
    app.use( '/test', function (req, res, next) {
    console.log('Time: %d', Date.now());
    next();
  });





  //fine aggiunta

  */
  /* istanbul ignore next */
  if (env === 'production' || env === 'development') {
    app.use(cors())
    app.use(compression())
    app.use(morgan('dev'))
  }
  app.use(bodyParser.urlencoded({
    extended: false
  }))
  app.use(bodyParser.json())
  app.use(apiRoot, routes)
  app.use(queryErrorHandler())
  app.use(bodyErrorHandler())
  app.use(express.static(path.join(__dirname, 'public')));
  return app
}

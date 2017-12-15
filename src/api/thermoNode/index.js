import {
  Router
} from 'express'
import {
  middleware as query
} from 'querymen'
import {
  middleware as body
} from 'bodymen'
import {
  create,
  index,
  show,
  update,
  destroy
} from './controller'
import {
  schema
} from './model'
export ThermoNode, {
  schema
}
from './model'


const router = new Router()
const {
  name,
  status,
  temp
} = schema.tree

/**
 * @api {post} /thermoNodes Create thermo node
 * @apiName CreateThermoNode
 * @apiGroup ThermoNode
 * @apiParam name Thermo node's name.
 * @apiParam status Thermo node's status.
 * @apiParam temp Thermo node's temp.
 * @apiSuccess {Object} thermoNode Thermo node's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Thermo node not found.
 */
router.post('/',
  body({
    name,
    status,
    temp
  }),
  create)

/**
 * @api {get} /thermoNodes Retrieve thermo nodes
 * @apiName RetrieveThermoNodes
 * @apiGroup ThermoNode
 * @apiUse listParams
 * @apiSuccess {Object[]} thermoNodes List of thermo nodes.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
// router.get('/',
//   query(),
//   index)
router.get('/',
  query(),

    function(req, res) {
      //console.log(res);

      res.render('thermo', { title: 'Express' })},

  )
/**
 * @api {get} /thermoNodes/:id Retrieve thermo node
 * @apiName RetrieveThermoNode
 * @apiGroup ThermoNode
 * @apiSuccess {Object} thermoNode Thermo node's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Thermo node not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /thermoNodes/:id Update thermo node
 * @apiName UpdateThermoNode
 * @apiGroup ThermoNode
 * @apiParam name Thermo node's name.
 * @apiParam status Thermo node's status.
 * @apiParam temp Thermo node's temp.
 * @apiSuccess {Object} thermoNode Thermo node's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Thermo node not found.
 */
router.put('/:id',
  body({
    name,
    status,
    temp
  }),
  update)

/**
 * @api {delete} /thermoNodes/:id Delete thermo node
 * @apiName DeleteThermoNode
 * @apiGroup ThermoNode
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Thermo node not found.
 */
router.delete('/:id',
  destroy)

export default router

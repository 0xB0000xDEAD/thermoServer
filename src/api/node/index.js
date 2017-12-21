import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Node, { schema } from './model'

const router = new Router()
const { name, temp, temp1, temp2, temp3, temp4, status } = schema.tree

/**
 * @api {post} /nodes Create node
 * @apiName CreateNode
 * @apiGroup Node
 * @apiParam name Node's name.
 * @apiParam temp Node's temp.
 * @apiParam temp1 Node's temp1.
 * @apiParam temp2 Node's temp2.
 * @apiParam temp3 Node's temp3.
 * @apiParam temp4 Node's temp4.
 * @apiParam status Node's status.
 * @apiSuccess {Object} node Node's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Node not found.
 */
router.post('/',
  body({ name, temp, temp1, temp2, temp3, temp4, status }),
  create)

/**
 * @api {get} /nodes Retrieve nodes
 * @apiName RetrieveNodes
 * @apiGroup Node
 * @apiUse listParams
 * @apiSuccess {Object[]} nodes List of nodes.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /nodes/:id Retrieve node
 * @apiName RetrieveNode
 * @apiGroup Node
 * @apiSuccess {Object} node Node's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Node not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /nodes/:id Update node
 * @apiName UpdateNode
 * @apiGroup Node
 * @apiParam name Node's name.
 * @apiParam temp Node's temp.
 * @apiParam temp1 Node's temp1.
 * @apiParam temp2 Node's temp2.
 * @apiParam temp3 Node's temp3.
 * @apiParam temp4 Node's temp4.
 * @apiParam status Node's status.
 * @apiSuccess {Object} node Node's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Node not found.
 */
router.put('/:id',
  body({ name, temp, temp1, temp2, temp3, temp4, status }),
  update)

/**
 * @api {delete} /nodes/:id Delete node
 * @apiName DeleteNode
 * @apiGroup Node
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Node not found.
 */
router.delete('/:id',
  destroy)

export default router

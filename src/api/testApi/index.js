import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export TestApi, { schema } from './model'

const router = new Router()
const { name, status, temp } = schema.tree

/**
 * @api {post} /testApis Create test api
 * @apiName CreateTestApi
 * @apiGroup TestApi
 * @apiParam name Test api's name.
 * @apiParam status Test api's status.
 * @apiParam temp Test api's temp.
 * @apiSuccess {Object} testApi Test api's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Test api not found.
 */
router.post('/',
  body({ name, status, temp }),
  create)

/**
 * @api {get} /testApis Retrieve test apis
 * @apiName RetrieveTestApis
 * @apiGroup TestApi
 * @apiUse listParams
 * @apiSuccess {Object[]} testApis List of test apis.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /testApis/:id Retrieve test api
 * @apiName RetrieveTestApi
 * @apiGroup TestApi
 * @apiSuccess {Object} testApi Test api's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Test api not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /testApis/:id Update test api
 * @apiName UpdateTestApi
 * @apiGroup TestApi
 * @apiParam name Test api's name.
 * @apiParam status Test api's status.
 * @apiParam temp Test api's temp.
 * @apiSuccess {Object} testApi Test api's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Test api not found.
 */
router.put('/:id',
  body({ name, status, temp }),
  update)

/**
 * @api {delete} /testApis/:id Delete test api
 * @apiName DeleteTestApi
 * @apiGroup TestApi
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Test api not found.
 */
router.delete('/:id',
  destroy)

export default router

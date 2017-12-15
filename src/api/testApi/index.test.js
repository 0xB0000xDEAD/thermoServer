import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { TestApi } from '.'

const app = () => express(apiRoot, routes)

let testApi

beforeEach(async () => {
  testApi = await TestApi.create({})
})

test('POST /testApis 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ name: 'test', status: 'test', temp: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.status).toEqual('test')
  expect(body.temp).toEqual('test')
})

test('GET /testApis 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /testApis/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${testApi.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(testApi.id)
})

test('GET /testApis/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /testApis/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${testApi.id}`)
    .send({ name: 'test', status: 'test', temp: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(testApi.id)
  expect(body.name).toEqual('test')
  expect(body.status).toEqual('test')
  expect(body.temp).toEqual('test')
})

test('PUT /testApis/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ name: 'test', status: 'test', temp: 'test' })
  expect(status).toBe(404)
})

test('DELETE /testApis/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${testApi.id}`)
  expect(status).toBe(204)
})

test('DELETE /testApis/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

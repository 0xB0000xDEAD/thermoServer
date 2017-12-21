import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Node } from '.'

const app = () => express(apiRoot, routes)

let node

beforeEach(async () => {
  node = await Node.create({})
})

test('POST /nodes 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ name: 'test', temp: 'test', temp1: 'test', temp2: 'test', temp3: 'test', temp4: 'test', status: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.temp).toEqual('test')
  expect(body.temp1).toEqual('test')
  expect(body.temp2).toEqual('test')
  expect(body.temp3).toEqual('test')
  expect(body.temp4).toEqual('test')
  expect(body.status).toEqual('test')
})

test('GET /nodes 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /nodes/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${node.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(node.id)
})

test('GET /nodes/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /nodes/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${node.id}`)
    .send({ name: 'test', temp: 'test', temp1: 'test', temp2: 'test', temp3: 'test', temp4: 'test', status: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(node.id)
  expect(body.name).toEqual('test')
  expect(body.temp).toEqual('test')
  expect(body.temp1).toEqual('test')
  expect(body.temp2).toEqual('test')
  expect(body.temp3).toEqual('test')
  expect(body.temp4).toEqual('test')
  expect(body.status).toEqual('test')
})

test('PUT /nodes/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ name: 'test', temp: 'test', temp1: 'test', temp2: 'test', temp3: 'test', temp4: 'test', status: 'test' })
  expect(status).toBe(404)
})

test('DELETE /nodes/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${node.id}`)
  expect(status).toBe(204)
})

test('DELETE /nodes/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

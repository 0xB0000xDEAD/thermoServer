import { success, notFound } from '../../services/response/'
import { TestApi } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  TestApi.create(body)
    .then((testApi) => testApi.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  TestApi.find(query, select, cursor)
    .then((testApis) => testApis.map((testApi) => testApi.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  TestApi.findById(params.id)
    .then(notFound(res))
    .then((testApi) => testApi ? testApi.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  TestApi.findById(params.id)
    .then(notFound(res))
    .then((testApi) => testApi ? Object.assign(testApi, body).save() : null)
    .then((testApi) => testApi ? testApi.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  TestApi.findById(params.id)
    .then(notFound(res))
    .then((testApi) => testApi ? testApi.remove() : null)
    .then(success(res, 204))
    .catch(next)

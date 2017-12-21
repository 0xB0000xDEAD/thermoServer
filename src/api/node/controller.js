import { success, notFound } from '../../services/response/'
import { Node } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Node.create(body)
    .then((node) => node.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Node.find(query, select, cursor)
    .then((nodes) => nodes.map((node) => node.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Node.findById(params.id)
    .then(notFound(res))
    .then((node) => node ? node.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Node.findById(params.id)
    .then(notFound(res))
    .then((node) => node ? Object.assign(node, body).save() : null)
    .then((node) => node ? node.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Node.findById(params.id)
    .then(notFound(res))
    .then((node) => node ? node.remove() : null)
    .then(success(res, 204))
    .catch(next)

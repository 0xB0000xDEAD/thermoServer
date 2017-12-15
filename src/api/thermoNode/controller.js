import { success, notFound } from '../../services/response/'
import { ThermoNode } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  ThermoNode.create(body)
    .then((thermoNode) => thermoNode.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  ThermoNode.find(query, select, cursor)
    .then((thermoNodes) => thermoNodes.map((thermoNode) => thermoNode.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  ThermoNode.findById(params.id)
    .then(notFound(res))
    .then((thermoNode) => thermoNode ? thermoNode.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  ThermoNode.findById(params.id)
    .then(notFound(res))
    .then((thermoNode) => thermoNode ? Object.assign(thermoNode, body).save() : null)
    .then((thermoNode) => thermoNode ? thermoNode.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  ThermoNode.findById(params.id)
    .then(notFound(res))
    .then((thermoNode) => thermoNode ? thermoNode.remove() : null)
    .then(success(res, 204))
    .catch(next)

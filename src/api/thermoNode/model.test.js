import { ThermoNode } from '.'

let thermoNode

beforeEach(async () => {
  thermoNode = await ThermoNode.create({ name: 'test', status: 'test', temp: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = thermoNode.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(thermoNode.id)
    expect(view.name).toBe(thermoNode.name)
    expect(view.status).toBe(thermoNode.status)
    expect(view.temp).toBe(thermoNode.temp)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = thermoNode.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(thermoNode.id)
    expect(view.name).toBe(thermoNode.name)
    expect(view.status).toBe(thermoNode.status)
    expect(view.temp).toBe(thermoNode.temp)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})

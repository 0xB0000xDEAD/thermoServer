import { Node } from '.'

let node

beforeEach(async () => {
  node = await Node.create({ name: 'test', temp: 'test', temp1: 'test', temp2: 'test', temp3: 'test', temp4: 'test', status: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = node.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(node.id)
    expect(view.name).toBe(node.name)
    expect(view.temp).toBe(node.temp)
    expect(view.temp1).toBe(node.temp1)
    expect(view.temp2).toBe(node.temp2)
    expect(view.temp3).toBe(node.temp3)
    expect(view.temp4).toBe(node.temp4)
    expect(view.status).toBe(node.status)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = node.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(node.id)
    expect(view.name).toBe(node.name)
    expect(view.temp).toBe(node.temp)
    expect(view.temp1).toBe(node.temp1)
    expect(view.temp2).toBe(node.temp2)
    expect(view.temp3).toBe(node.temp3)
    expect(view.temp4).toBe(node.temp4)
    expect(view.status).toBe(node.status)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})

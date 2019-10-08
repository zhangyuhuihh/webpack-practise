const add = (a, b) => {
  return a + b
}

describe('calculate test', () => {
  it('function add should return right sum', () => {
    expect(add(1, 5)).equal(6)
  })
})
import { msg } from '../src/ts/message'

test('check if typeof welcome message is string', () => {
  expect(typeof msg).toBe('string')
})

import { render } from '@redwoodjs/testing/web'

import EventMap from './EventMap'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('EventMap', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<EventMap />)
    }).not.toThrow()
  })
})

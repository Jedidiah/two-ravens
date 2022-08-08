import { render } from '@redwoodjs/testing/web'

import EventList from './EventList'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('EventList', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<EventList />)
    }).not.toThrow()
  })
})

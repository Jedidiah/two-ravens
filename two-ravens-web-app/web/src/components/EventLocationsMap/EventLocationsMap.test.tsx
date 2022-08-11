import { render } from '@redwoodjs/testing/web'

import EventLocationsMap from './EventLocationsMap'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('EventLocationsMap', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<EventLocationsMap />)
    }).not.toThrow()
  })
})

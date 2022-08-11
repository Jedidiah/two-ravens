import { render } from '@redwoodjs/testing/web'

import PublicMap from './PublicMap'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('PublicMap', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PublicMap />)
    }).not.toThrow()
  })
})

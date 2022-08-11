import { render } from '@redwoodjs/testing/web'

import CameraTrapStatus from './CameraTrapStatus'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CameraTrapStatus', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CameraTrapStatus />)
    }).not.toThrow()
  })
})

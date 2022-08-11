import { render } from '@redwoodjs/testing/web'

import CameraTrapQrCode from './CameraTrapQrCode'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CameraTrapQrCode', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CameraTrapQrCode />)
    }).not.toThrow()
  })
})

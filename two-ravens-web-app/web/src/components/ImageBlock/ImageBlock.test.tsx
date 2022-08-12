import { render } from '@redwoodjs/testing/web'

import ImageBlock from './ImageBlock'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ImageBlock', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ImageBlock />)
    }).not.toThrow()
  })
})

import { render } from '@redwoodjs/testing/web'

import EnvelopeEmailField from './EnvelopeEmailField'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('EnvelopeEmailField', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<EnvelopeEmailField />)
    }).not.toThrow()
  })
})

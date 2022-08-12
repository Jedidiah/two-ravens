import { render } from '@redwoodjs/testing/web'

import BatchApprovalModal from './BatchApprovalModal'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('BatchApprovalModal', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<BatchApprovalModal />)
    }).not.toThrow()
  })
})

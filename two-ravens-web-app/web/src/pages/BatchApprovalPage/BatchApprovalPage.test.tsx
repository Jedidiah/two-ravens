import { render } from '@redwoodjs/testing/web'

import BatchApprovalPage from './BatchApprovalPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('BatchApprovalPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<BatchApprovalPage />)
    }).not.toThrow()
  })
})

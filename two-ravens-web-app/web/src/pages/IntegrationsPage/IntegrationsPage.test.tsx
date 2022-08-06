import { render } from '@redwoodjs/testing/web'

import IntegrationsPage from './IntegrationsPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('IntegrationsPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<IntegrationsPage />)
    }).not.toThrow()
  })
})

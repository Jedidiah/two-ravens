import { render } from '@redwoodjs/testing/web'

import OauthCallbackMediavaletPage from './OauthCallbackMediavaletPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('OauthCallbackMediavaletPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<OauthCallbackMediavaletPage />)
    }).not.toThrow()
  })
})

import { render } from '@redwoodjs/testing/web'

import OauthCallbackDocusignPage from './OauthCallbackDocusignPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('OauthCallbackDocusignPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<OauthCallbackDocusignPage />)
    }).not.toThrow()
  })
})

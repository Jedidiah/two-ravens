import { render } from '@redwoodjs/testing/web'

import LocaleDate from './LocaleDate'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('LocaleDate', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<LocaleDate />)
    }).not.toThrow()
  })
})

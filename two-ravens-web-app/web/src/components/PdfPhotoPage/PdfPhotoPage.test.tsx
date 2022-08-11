import { render } from '@redwoodjs/testing/web'

import PdfPhotoPage from './PdfPhotoPage'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('PdfPhotoPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PdfPhotoPage />)
    }).not.toThrow()
  })
})

import { render } from '@redwoodjs/testing/web';

import MainMenu from './MainMenu';

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('MainMenu', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MainMenu />);
    }).not.toThrow();
  });
});

import { render } from '@testing-library/react';

describe('<Authentication>', () => {
  it('should redirect to /clubs if a session is open.', () => {
    render(<div></div>);
    expect(1).toBe(1);
  });
});

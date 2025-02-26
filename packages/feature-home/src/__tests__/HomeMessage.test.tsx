import { cleanup, render, screen } from '@testing-library/react-native';

import { HomeMessage } from '../HomeMessage';

afterEach(cleanup);

// TODO: Fix this test
it('renders the expected text', () => {
  render(<HomeMessage />);
  expect(screen.getByText(/Expo monorepo/i)).toBeDefined();
});

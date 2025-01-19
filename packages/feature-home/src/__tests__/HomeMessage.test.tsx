import { cleanup, render, screen } from '@testing-library/react-native';

import { HomeMessage } from '../HomeMessage';

afterEach(cleanup);

it('says Expo monorepo', () => {
  render(<HomeMessage />);
  expect(screen.getByText('Expo monorepo')).toBeDefined();
});

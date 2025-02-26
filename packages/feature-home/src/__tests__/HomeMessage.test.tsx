import Lang from '@repo/lang';
import { cleanup, render, screen } from '@testing-library/react-native';

import { HomeMessage } from '../HomeMessage';

beforeAll(() => {
  // Configura el idioma por defecto para los tests
  Lang.setLocale('en');
});

afterEach(cleanup);

it('renders the expected text', () => {
  render(<HomeMessage />);
  expect(screen.getByText(/Expo monorepo/i)).toBeDefined();
});

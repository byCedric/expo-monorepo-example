import { cleanup, render, screen } from '@testing-library/react-native';

import { HomeIcon } from '../HomeMessageIcon';

afterEach(cleanup);

it('renders a wave emoji', () => {
  render(<HomeIcon testID="icon" />);
  expect(screen.getByTestId('icon').children).toContain('👋');
});

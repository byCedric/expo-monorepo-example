import { cleanup, render, screen } from '@testing-library/react-native';

import { HomeMessageIcon } from '../HomeMessageIcon';

afterEach(cleanup);

it('renders a wave emoji', () => {
  render(<HomeMessageIcon testID="icon" />);
  expect(screen.getByTestId('icon').children).toContain('👋');
});

import { render } from '@testing-library/react-native';

import { ThemedText } from '../ThemedText';

it(`renders correctly`, () => {
  const component = render(<ThemedText>Snapshot test!</ThemedText>);
  expect(component.toJSON()).toMatchSnapshot();
});

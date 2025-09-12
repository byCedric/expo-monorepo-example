import { render } from '@testing-library/react-native';

import { ThemedText } from '../themed-text';

it(`renders correctly`, () => {
  const component = render(<ThemedText>Snapshot test!</ThemedText>);
  expect(component.toJSON()).toMatchSnapshot();
});

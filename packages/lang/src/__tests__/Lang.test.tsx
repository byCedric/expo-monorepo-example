import { Strong } from '@repo/ui';
import { cleanup, render, screen } from '@testing-library/react-native';

import Lang from '..';

afterEach(cleanup);

it('Lang get test', () => {
  const translation = Lang.get('welcome');
  expect(translation).toEqual(
    <>
      Hello from an <Strong>Expo monorepo</Strong>!
    </>
  );
});

it('Lang get test and change localization', () => {
  Lang.setLocale('es');
  const translation = Lang.get('welcome');
  expect(Lang.getLocale()).toBe('es');
  expect(translation).toEqual(
    <>
      ¡Hola desde un <Strong>Expo monorepo</Strong>!
    </>
  );
});

describe('Lang localization tests', () => {
  it('should change the locale to Spanish', () => {
    Lang.setLocale('es');
    expect(Lang.getLocale()).toBe('es');
  });
});

it('says Expo monorepo', () => {
  render(Lang.getComponent({ textKey: 'welcome' }));
  expect(screen.getByText(/Expo monorepo/i)).toBeDefined();
});

import { I18n, TranslateOptions } from 'i18n-js';
import React from 'react';

import en from './lang.en';
import es from './lang.es';

// Load translations
const loadTranslations = () => ({ en, es });

const i18n = new I18n(loadTranslations());
// The default locale
i18n.defaultLocale = 'en';
i18n.enableFallback = true;

export default {
  /**
   * Get a localized text
   *
   * @param {string} key - Name of the text.
   * @param {TranslateOptions} options - Some options, not really necessary.
   * @returns {string} The text in the correct locale
   */
  get(key: string, options: TranslateOptions = {}): string {
    return i18n.t(key, options); // Return raw text for standard use
  },

  /**
   * Get a localized text or component.
   * This function is designed to return either plain text or a React Native component.
   *
   * @param {string} key - Name of the text or component.
   * @param {TranslateOptions} options - Some options, not really necessary.
   * @returns {ReactNode} The text or component in the correct locale
   */
  getComponent({
    textKey,
    options = {},
  }: {
    textKey: string;
    options?: TranslateOptions;
  }): JSX.Element {
    const component = i18n.t(textKey, options);
    return <>{component}</>; // Should have a unique key, but it doesn't make much sense, considering that only text or a component is returned.
  },

  /**
   * Make sure to call this function with the locale of the user.
   * Set the locale (If no locale it will not change it, so it will be the default)
   *
   * @param {string} [locale] - The new locale.
   */
  setLocale(locale?: string | null): void {
    if (locale) i18n.locale = locale;
  },

  /**
   * Get the locale
   *
   * @returns {string} The locale.
   */
  getLocale(): string {
    return i18n.locale;
  },
};

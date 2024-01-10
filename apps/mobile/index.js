// eslint-disable-next-line
import ReactNativeFeatureFlags from 'react-native/Libraries/ReactNative/ReactNativeFeatureFlags';

import 'expo-router/entry';

// enable the JS-side of the w3c PointerEvent implementation
ReactNativeFeatureFlags.shouldEmitW3CPointerEvents = () => true;

// enable hover events in Pressibility to be backed by the PointerEvent implementation.
// shouldEmitW3CPointerEvents should also be true
ReactNativeFeatureFlags.shouldPressibilityUseW3CPointerEventsForHover = () => true;

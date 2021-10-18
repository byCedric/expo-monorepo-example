import React, { useEffect, useState } from 'react';
import { storiesOf } from '@storybook/react-native';
import { useFonts }from 'expo-font';
import { Text } from 'react-native';

export default {
  title: 'Font',
};

export const CustomFontComponent = () => {

  let [fontsLoaded] = useFonts({
    'retro-regular': require('./assets/retro-regular.ttf')
  })
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (

      <Text
        style={{
          fontFamily: 'retro-regular',
          backgroundColor: 'transparent',
          fontSize: 56,
          color: '#000'
        }}
      >
        Cool new font
      </Text>
    
  );
}

// On-Device Register
storiesOf('Font', module).add('Font', () => (<CustomFontComponent/>));

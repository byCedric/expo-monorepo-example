import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';

export interface StrongProps extends TextProps {
  children?: React.ReactNode;
}

export const Strong = ({ children, style, ...props }: StrongProps) => (
  <Text {...props} style={[$strong, style]}>
    {children}
  </Text>
);

const { $strong } = StyleSheet.create({
  $strong: {
    fontWeight: 'bold',
    color: 'rgb(0, 0, 238)',
  },
});

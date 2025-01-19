import { StyleSheet, Text, TextProps } from 'react-native';

export const Paragraph = ({ children, style, ...props }: TextProps) => (
  <Text {...props} style={[$paragraph, style]}>
    {children}
  </Text>
);

const { $paragraph } = StyleSheet.create({
  $paragraph: {
    fontSize: 24,
    letterSpacing: 0.25,
    marginVertical: 2,
  },
});

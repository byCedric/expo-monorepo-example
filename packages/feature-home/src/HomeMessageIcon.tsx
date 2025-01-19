import { Paragraph } from '@acme/ui';
import { ComponentProps } from 'react';

type HomeMessageIconProps = ComponentProps<typeof Paragraph>;

export const HomeMessageIcon = ({ style, ...props }: HomeMessageIconProps) => (
  <Paragraph style={[{ fontSize: 28 }, style]} {...props}>
    👋
  </Paragraph>
);

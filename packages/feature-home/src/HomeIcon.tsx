import { Paragraph } from '@acme/ui';
import React, { ComponentProps } from 'react';

type HomeIconProps = ComponentProps<typeof Paragraph>;

export const HomeIcon = ({ style, ...other }: HomeIconProps) => (
  <Paragraph style={[{ fontSize: 28 }, style]} {...other}>
    👋
  </Paragraph>
);

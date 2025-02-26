import Lang from '@repo/lang';
import { Paragraph } from '@repo/ui';
import { ComponentProps } from 'react';

type HomeMessageProps = ComponentProps<typeof Paragraph>;

export const HomeMessage = (props: HomeMessageProps) => (
  <Paragraph {...props}>
    <Lang.getComponent textKey="welcome" />
  </Paragraph>
);

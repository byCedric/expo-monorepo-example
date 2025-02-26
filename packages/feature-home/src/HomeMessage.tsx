import Lang from '@acme/lang';
import { Paragraph } from '@acme/ui';
import { ComponentProps } from 'react';

type HomeMessageProps = ComponentProps<typeof Paragraph>;

export const HomeMessage = (props: HomeMessageProps) => (
  <Paragraph {...props}>
    <Lang.getComponent textKey="welcome" />
  </Paragraph>
);

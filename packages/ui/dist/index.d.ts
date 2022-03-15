import React from 'react';
import { TextProps } from 'react-native';

interface ParagraphProps extends TextProps {
    children?: React.ReactNode;
}
declare const Paragraph: ({ children, style, ...props }: ParagraphProps) => JSX.Element;
interface StrongProps extends TextProps {
    children?: React.ReactNode;
}
declare const Strong: ({ children, style, ...props }: StrongProps) => JSX.Element;

export { Paragraph, ParagraphProps, Strong, StrongProps };

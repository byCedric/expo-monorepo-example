import React from "react";
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react-native";
import { Button } from "react-native";
import styled from "styled-components/native";

const StyledButton = styled.TouchableOpacity`
  background-color: red;
  padding: 3px;
`;

const StyledText = styled.Text`
  color: white;
`;

export default {
  title: "Button",
};

export const text = () => (
  <Button title="Hello Button" onPress={action("clicked")} />
);
export const styledComponent = () => (
  <StyledButton onPress={action("clicked")}>
    <StyledText>Hello Button</StyledText>
  </StyledButton>
);
export const red = () => (
  <Button title="Hello Button" color="red" onPress={action("clicked")} />
);

// On-Device Register
storiesOf("Button", module)
  .add("Text", text)
  .add("Styled Components", styledComponent)
  .add("Red", red);

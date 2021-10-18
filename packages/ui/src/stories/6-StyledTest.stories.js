import React from "react";
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react-native";
import { View } from "react-native";
import styled from "styled-components/native";

const StyledText = styled.Text`
  color: white;
`;

const StyledButton = styled.TouchableOpacity`
  background-color: red;
  padding: 10px;

  ${({ color }) =>
    color === "blue" &&
    `

    background-color: blue;

    & ${StyledText} {
        color:red;
    }
  `}
`;

export default {
  title: "Styled Test",
};

export const styledComponent = () => (
  <View style={{ flexDirection: "row" }}>
    <StyledButton color="blue" onPress={action("clicked")}>
      <StyledText>Hello Button</StyledText>
    </StyledButton>
  </View>
);

// On-Device Register
storiesOf("Styled Test", module).add("Text", styledComponent);

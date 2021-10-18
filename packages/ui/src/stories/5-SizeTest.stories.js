import React from "react";
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react-native";
import { Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";

const StyledButton = styled.TouchableOpacity`
  background-color: red;
  padding: 10px;
`;

const StyledText = styled.Text`
  color: white;
`;

const NativeButton = () => (
  <TouchableOpacity style={{ padding: 10, backgroundColor: "red" }}>
    <Text style={{ color: "white" }}>Hello Button</Text>
  </TouchableOpacity>
);

export default {
  title: "Size Test",
};

export const styledComponent = () => (
  <View style={{ flexDirection: "row" }}>
    <StyledButton onPress={action("clicked")}>
      <StyledText>Hello Button</StyledText>
    </StyledButton>
    <NativeButton />
  </View>
);

// On-Device Register
storiesOf("Size Test", module).add("Text", styledComponent);

import { Paragraph, Strong } from "@acme/ui";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View, Image } from "react-native";

const img = require('./assets/icon.png');

export default function App() {
  return (
    <View style={styles.container}>
      <Paragraph>
        Hello from an <Strong>EAS</Strong> monorepo (ejected)
      </Paragraph>
      <StatusBar style="auto" />
      <Image source={img} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

import { Paragraph, Strong } from "@acme/ui";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import { MMKV, useMMKVString } from "react-native-mmkv";

const storage = new MMKV();

export default function App() {
  const [usernameInput, setUsernameInput] = useState("");

  const [username, setUsername] = useMMKVString("user.name", storage);

  return (
    <View style={styles.container}>
      <Paragraph>
        Hello from an <Strong>EAS</Strong> monorepo (with-dev-client)
      </Paragraph>
      <Paragraph>
        Your MMKV username is <Strong>{username ?? "unknown"}</Strong>
      </Paragraph>
      <TextInput
        placeholder="Type your username here"
        value={usernameInput}
        onChangeText={(u) => setUsernameInput(u)}
        style={styles.input}
      />
      <Button
        title="Save"
        onPress={() => usernameInput.length && setUsername(usernameInput)}
      />
      <StatusBar style="auto" />
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
  input: {
    fontSize: 20,
    marginTop: 10,
  },
});

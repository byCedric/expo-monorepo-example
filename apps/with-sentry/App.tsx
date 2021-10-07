import { Paragraph, Strong } from "@acme/ui";
import { StatusBar } from "expo-status-bar";
import { useCallback } from "react";
import { Button, StyleSheet, View } from "react-native";
import * as Sentry from "sentry-expo";

Sentry.init({
  dsn: "https://2034b43a8da54401be835e15d1031bb9@o58562.ingest.sentry.io/5878591",
});

export default function App() {
  const onTriggerError = useCallback(() => {
    throw new Error("This is an error");
  }, []);

  return (
    <View style={styles.container}>
      <Paragraph>
        Hello from an <Strong>EAS</Strong> monorepo (with-sentry)
      </Paragraph>
      <Button title="Trigger error" onPress={onTriggerError} />
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
});

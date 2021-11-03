import { Strong } from "@acme/ui";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, Layout, Text } from "@ui-kitten/components";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";

export default function App() {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <Layout style={styles.container}>
        <Text category="h1">Hello!</Text>
        <Text category="p1">
          from an <Strong>EAS</Strong> monorepo (managed)
        </Text>
        <StatusBar style="auto" />
      </Layout>
    </ApplicationProvider>
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

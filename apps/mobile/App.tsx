import { HomeIcon, HomeScreen } from '@acme/feature-home';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, View } from 'react-native';
import Share from 'react-native-share';

export default function App() {
  async function testShare() {
    try {
      const result = await Share.open({ url: 'https://docs.expo.dev' });
      console.log('Shared Expo docs', result);
    } catch (error) {
      console.log('Failed to share', error);
    }
  }

  return (
    <View style={styles.container}>
      <HomeIcon style={{ fontSize: 64 }} />
      <Button title="Test share" onPress={testShare} />
      <HomeScreen />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

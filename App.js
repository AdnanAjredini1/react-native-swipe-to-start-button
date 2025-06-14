import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SwipeButton from './SwipeButton';

export default function App() {
  return (
    <View style={styles.container}>

      <SwipeButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8d8686',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

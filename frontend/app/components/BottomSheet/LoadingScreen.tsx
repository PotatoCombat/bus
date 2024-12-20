import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

const LoadingScreen = () => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height:'100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Semi-transparent background
  },
    loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height:'100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: 'white',
  },
});

export default LoadingScreen;

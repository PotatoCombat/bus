import { View, StyleSheet } from "react-native";
import MapView from "react-native-maps";

const styles = StyleSheet.create({
 container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },  
});

export default function Index() {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: 1.364917,
          longitude: 103.822872,
          latitudeDelta: 0,
          longitudeDelta: 0.55,
        }}
      />
    </View>
  );
}

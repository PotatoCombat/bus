import { StyleSheet, View } from "react-native";
import MapView from "react-native-maps";
import Search from "./components/search/Search";

const styles = StyleSheet.create({
  container: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'center',
      alignItems: 'center',
  },
  map: {
      ...StyleSheet.absoluteFillObject,
  },
  search: {
      ...StyleSheet.absoluteFillObject,
      position: 'absolute',
      top: 54,
      left: 16.5,
      right: 16.5,
  }
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
      <Search style={styles.search} />
    </View>
  );
}

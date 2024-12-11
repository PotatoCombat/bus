import { View } from "react-native";
import MapView from "react-native-maps";
import styles from "./styles";
import Search from "./components/search/Search";

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

import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Search from "./components/search/Search";
import { mockBusRoute } from './utils/mockBusRoute';
import SearchResultInterface from "./types/SearchResultInterface";
import { useState } from "react";

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
  const [busRoute, setBusRoute] = useState<Array<any>>([]);
  const updateBusRoute = function (result: SearchResultInterface | null) {
    if (result?.serviceNo === '86') {
      setBusRoute(mockBusRoute);
      return;
    }
    setBusRoute([]);
  }

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
      >
        {busRoute.map(busStop => (
          <Marker
            key={busStop.BusStopCode}
            coordinate={{latitude: busStop.Latitude, longitude: busStop.Longitude}}
            title={busStop.Description}
            description={busStop.RoadName}
          />
        ))}
      </MapView>
      <Search style={styles.search} onSelectedResult={updateBusRoute}/>
    </View>
  );
}

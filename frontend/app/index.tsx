import { StyleSheet, View } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
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
  const [selectedBusStop, setSelectedBusStop] = useState<string>('');

  // TODO: Replace with actual API to get busRoute
  const updateBusRoute = function (result: SearchResultInterface | null) {
    if (result?.serviceNo === '88') {
      setBusRoute(mockBusRoute);
      return;
    }
    setBusRoute([]);
  }

  // TODO: Open bus stop timings
  const selectBusStop = function(busStopCode: string) {
    setSelectedBusStop(busStopCode);
  }

  // TODO: Close bus stop timings
  const deselectBusStop = function(busStopCode: string) {
    setSelectedBusStop('');
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
        {busRoute.at(-1) &&
          <Marker
            key={busRoute.at(-1).BusStopCode}
            coordinate={{latitude: busRoute.at(-1).Latitude, longitude: busRoute.at(-1).Longitude}}
            tappable={false}
          />
        }
        {busRoute.map(busStop => (
          <Marker
            key={busStop.BusStopCode}
            coordinate={{latitude: busStop.Latitude, longitude: busStop.Longitude}}
            title={busStop.Description}
            description={busStop.RoadName}
            image={
              (selectedBusStop === busStop.BusStopCode)
                ? require('../assets/images/circle-purple.png')
                : require('../assets/images/circle-red.png')
            }
            anchor={{x: 0.5, y: 0.5}}
            onSelect={() => selectBusStop(busStop.BusStopCode)}
            onDeselect={() => deselectBusStop(busStop.BusStopCode)}
          >
          </Marker>
        ))}
        <Polyline
          coordinates={busRoute.map(busStop => ({latitude: busStop.Latitude, longitude: busStop.Longitude}))}
          strokeColor="#AA0000"
          strokeWidth={6}
        />
      </MapView>
      <Search style={styles.search} onSelectedResult={updateBusRoute}/>
    </View>
  );
}

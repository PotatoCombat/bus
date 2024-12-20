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

const icon = () => {
  return(
    <Svg 
      height = {20}
      width = {20}
    >
    <Ellipse
      cx="10"
      cy="10"
      rx="10"
      ry="10"
      fill="blue"
      stroke="#fff"
      strokeWidth="2"
    />
    </Svg>

    )
}

export default function Index() {
  const [busRoute, setBusRoute] = useState<Array<any>>([]);
  const [selectedBusStop, setSelectedBusStop] = useState<string>('');

  const updateBusRoute = function (result: SearchResultInterface | null) {
    if (result?.serviceNo === '88') {
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
            image={selectedBusStop === busStop.BusStopCode ? require('../assets/images/circle-purple.png') : require('../assets/images/circle-red.png')}
            anchor={{x: 0.5, y: 0.5}}
            onSelect={() => setSelectedBusStop(busStop.BusStopCode)}
            onDeselect={() => setSelectedBusStop('')}
          >
          </Marker>
        ))}
        <Polyline
          coordinates={busRoute.map(busStop => ({latitude: busStop.Latitude, longitude: busStop.Longitude}))}
          strokeColor="#AA0000" // fallback for when `strokeColors` is not supported by the map-provider}
          strokeWidth={6}
        />
      </MapView>
      <Search style={styles.search} onSelectedResult={updateBusRoute}/>
    </View>
  );
}

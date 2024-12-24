import { StyleSheet, View } from "react-native";
import MapView from "react-native-maps";
import Search from "./components/search/Search";
import { useRef, useState } from "react";
import BottomSheetDisplay from "./components/BottomSheet/BottomSheetDisplay";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import LoadingScreen from "./components/BottomSheet/LoadingScreen";
import { mockBusRoute } from './utils/mockBusRoute';
import SearchResultInterface from "./types/SearchResultInterface";
import BusRoute from "./components/map/BusRoute";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

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
  },
  contentContainer: {
		flex: 1,
		alignItems: 'center'
	},
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// Function to simulate loading
// Function to simulate loading
export default function Index() {
const [busRoute, setBusRoute] = useState<Array<any>>([]);

  // TODO: Replace with actual API to get busRoute
  const updateBusRoute = function (result: SearchResultInterface | null) {
    setBusRoute(result?.serviceNo === '88' ? mockBusRoute : []);
  }

  // TODO: Open bus stop timings
  const selectBusStop = function(busStopCode: string) {
    bottomSheetModalRef.current?.present();
  }

  // TODO: Close bus stop timings
  const deselectBusStop = function(busStopCode: string) {
    bottomSheetModalRef.current?.dismiss();
  }

const [loading, setLoading] = useState(false);
const bottomSheetModalRef = useRef<BottomSheetModal>(null);
const handleButtonClick = () => {
  setLoading(true);
  // Show loading for 1 second
  setTimeout(() => {
    setLoading(false);
  }, 1000); // 1000 milliseconds = 1 second
};

  return (<>
    <GestureHandlerRootView>
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={{
            latitude: 1.364917,
            longitude: 103.822872,
            latitudeDelta: 0,
            longitudeDelta: 0.55,
          }}
          moveOnMarkerPress={false}
        >
          <BusRoute
            busRoute={busRoute}
            onSelectBusStop={selectBusStop}
            onDeselectBusStop={deselectBusStop}
          />
        </MapView>
          <BottomSheetDisplay
              onRefresh={handleButtonClick}  // Pass button press handler
              bottomSheetModalRef={bottomSheetModalRef}  // Pass ref to BottomSheet
            />
          <Search style={styles.search} onSelectedResult={updateBusRoute} />
          {loading ? (
            <LoadingScreen />  // Show loading screen while loading is true
          ) : (
            <View/>
          )}

        </View>
      
    </GestureHandlerRootView>
    </>
  );
}

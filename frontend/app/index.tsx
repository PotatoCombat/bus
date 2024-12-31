import BottomSheetDisplay from "@/app/components/BottomSheet/BottomSheetDisplay";
import LoadingScreen from "@/app/components/BottomSheet/LoadingScreen";
import BusRoute from "@/app/components/map/BusRoute";
import Search from "@/app/components/search/Search";
import BusRouteInterface from "@/app/types/BusRouteInterface";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
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
export default function Index() {
  const [busRoute, setBusRoute] = useState<BusRouteInterface | undefined>();
  const [busStop, setBusStop] = useState<string | undefined>(undefined);

  const [loading, setLoading] = useState(false);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const selectBusRoute = function (result: BusRouteInterface) {
    setBusRoute(result);
  }

  const clearBusRoute = function () {
    setBusRoute(undefined);
  }

  const selectBusStop = function(busStopCode: string) {
    setBusStop(busStopCode);
    bottomSheetModalRef.current?.present();
  }

  const deselectBusStop = function(busStopCode: string) {
    setBusStop(undefined);
    bottomSheetModalRef.current?.dismiss();
  }

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
        >
          {busRoute !== undefined && (
            <BusRoute
              busRoute={busRoute}
              onSelectBusStop={selectBusStop}
              onDeselectBusStop={deselectBusStop}
            />
          )}
        </MapView>
          <BottomSheetDisplay
              busStopCode={busStop}
              onRefresh={handleButtonClick}  // Pass button press handler
              bottomSheetModalRef={bottomSheetModalRef}  // Pass ref to BottomSheet
            />
          <Search
            style={styles.search}
            onSelectedResult={selectBusRoute}
            onClearedResult={clearBusRoute}
          />
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

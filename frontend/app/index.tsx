import { StyleSheet, View } from "react-native";
import MapView from "react-native-maps";
import Search from "./components/search/Search";
import React, { useRef, useState } from "react";
import BottomSheetDisplay from "./components/BottomSheet/BottomSheetDisplay";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import LoadingScreen from "./components/BottomSheet/LoadingScreen";

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
  
const [loading, setLoading] = useState(false);
const bottomSheetModalRef = useRef(null);
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
            initialRegion={{
              latitude: 1.364917,
              longitude: 103.822872,
              latitudeDelta: 0,
              longitudeDelta: 0.55,
            }}
          />
          <BottomSheetDisplay 
              onPress={handleButtonClick}  // Pass button press handler
              bottomSheetModalRef={bottomSheetModalRef}  // Pass ref to BottomSheet
            />
          <Search style={styles.search} />
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

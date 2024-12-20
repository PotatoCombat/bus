import { StyleSheet, View } from "react-native";
import MapView from "react-native-maps";
import Search from "./components/search/Search";
import React from "react";
import BottomSheetDisplay from "./components/BottomSheet/BottomSheetDisplay";
import { GestureHandlerRootView } from "react-native-gesture-handler";

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
	}
});

export default function Index() {
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
        <BottomSheetDisplay>
      </BottomSheetDisplay>
        <Search style={styles.search} />
        
      </View>
    </GestureHandlerRootView>
    </>
  );
}

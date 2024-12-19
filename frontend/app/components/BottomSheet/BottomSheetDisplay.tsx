import React, { useCallback, useMemo, useRef } from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import ListRow from "./ListRow";
import { mockBusArrival } from "@/app/utils/mockData";

export default function BottomSheetDisplay() {
  const snapPoints = useMemo(() => ["50%", "70%"], []);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);
  const firstItem = mockBusArrival.length > 0 ? mockBusArrival[0] : null;

  return (
    <BottomSheetModalProvider>
      <TouchableHighlight onPress={() => {}}>
        <View>
          <Icon
            name="circle"
            size={30}
            color="#FF0000"
            onPress={handlePresentModalPress}
          ></Icon>
        </View>
      </TouchableHighlight>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <BottomSheetView style={styles.contentContainer}>
          <View style={{ flexDirection: "row", padding: 8, justifyContent:'space-between' }}>
            <View>
              {firstItem ? (
                <>
                  <Text style={styles.busStopHeader}>
                    Bus Stop {firstItem.busStopNo}
                  </Text>
                </>
              ) : (
                <Text>No data available</Text>
              )}
            </View>

            <TouchableHighlight onPress={() => {}}>
              <View style={styles.refresh}>
                <Icon
                  name="refresh"
                  size={30}
                  color="black"
                  onPress={handlePresentModalPress}
                ></Icon>
              </View>
            </TouchableHighlight>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.lineStyle}></View>
          </View>

          <ListRow></ListRow>
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    justifyContent:'center',
  },
  item: {
    flex: 1,
    maxWidth: "25%", // 100% devided by the number of rows you want
    alignItems: "center",

    // my visual styles; not important for the grid
    padding: 10,
    backgroundColor: "rgba(249, 180, 45, 0.25)",
    borderWidth: 1.5,
    borderColor: "#fff",
  },
  busStopHeader: {
    fontSize: 30,
    flex: 1,
    paddingLeft: 8,
	justifyContent:'center',
  },
  refresh: {
    flex: 1,
    paddingRight: 8,
	justifyContent:'center'
  },
  lineStyle: {
    height: 1,
    width: "95%",
    marginHorizontal: 20,
    marginTop: 10,
    backgroundColor: "#D9D9D9",
    marginBottom: 10,
  },
});

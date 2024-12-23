import { Ref, useCallback, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

import { fetchBusArrivalData } from "@/app/services/BusArrivalApi";
import ListRow from "./ListRow";

const { height } = Dimensions.get("window");

export default function BottomSheetDisplays({
  onRefresh,
  bottomSheetModalRef,
}: {
  onRefresh?: () => void;
  bottomSheetModalRef: Ref<BottomSheetModal>;
}) {

  const [busData, setBusData] = useState<any>(null);
  const handleFetchData = async () => {
    const busStopCode = "77009"; // Use your dynamic bus stop code here
    const data = await fetchBusArrivalData(busStopCode);
    if (data) {
      setBusData(data);
    }
  };

  // const [data, setData] = useState(mockBusArrival);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const handleRefresh = () => {
    console.log("Refreshing data...");
    handleFetchData();
    onRefresh?.();
  };

  const snapPoints = useMemo(() => ["50%"], []);

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <BottomSheetView style={styles.contentContainer}>
          <View
            style={{
              flexDirection: "row",
              padding: 8,
              height: 50,
              justifyContent: "space-between",
            }}
          >
            <View style={{ maxHeight: height * 0.5 }}>
              {busData ? (
                <Text style={styles.busStopHeader}>
                  Bus Stop {busData.BusStopCode}
                </Text>
              ) : (
                <Text></Text>
              )}
            </View>
            {busData ? (
              <View style={styles.refresh}>
                <Icon
                  name="refresh"
                  size={30}
                  color="black"
                  onPress={handleRefresh}
                ></Icon>
              </View>
            ) : (
              <Text></Text>
            )}
          </View>
          {busData ? (
            <View style={{ flexDirection: "row" }}>
              <View style={styles.divider}></View>
            </View>
          ) : (
            <Text></Text>
          )}

          {busData ? <ListRow busData={busData} /> : <Text></Text>}
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    justifyContent: "center",
  },
  busStopHeader: {
    fontSize: 30,
    flex: 1,
    paddingLeft: 8,
    justifyContent: "center",
  },
  refresh: {
    flex: 1,
    paddingRight: 8,
    alignItems: "flex-end", // Aligns content (icon) to the right
    justifyContent: "center", // Centers the icon vertically
  },
  divider: {
    height: 1,
    width: "95%",
    marginHorizontal: 20,
    marginTop: 10,
    backgroundColor: "#D9D9D9",
    marginBottom: 10,
  },
  item: {
    paddingLeft: 12,
    height: 60,
    marginVertical: 8,
    flex: 1,
    justifyContent: "center",
  },
  arrival: {
    borderRadius: 8,
    backgroundColor: "#D9D9D9",
    margin: 8,
    justifyContent: "center",
    flex: 1,
  },
  arrivalText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  blank: {
    flex: 1,
  },
  title: {
    fontSize: 32,
    textAlign: "center",
  },
  triangleCorner1: {
    height: 1,
    width: "auto",
    transform: [{ rotateX: "135deg" }, { rotateZ: "45deg" }],
    backgroundColor: "black",
  },
});

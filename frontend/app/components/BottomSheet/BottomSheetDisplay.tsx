import { Ref, useCallback, useEffect, useMemo, useRef, useState } from "react";
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

export default function BottomSheetDisplay({
  busStopCode,
  bottomSheetModalRef,
  onRefresh,
}: {
  busStopCode?: string;
  bottomSheetModalRef: Ref<BottomSheetModal>;
  onRefresh?: () => void;
}) {
  const [busData, setBusData] = useState<any>(null);
  const [refreshing, setRefreshing] = useState(false); // To track refresh status

  // Function to fetch bus arrival data
  const fetchBusData = (code: string) => {
    setRefreshing(true);
    fetchBusArrivalData(code)
      .then(result => {
        setBusData(result);
      })
      .catch(console.error)
      .finally(() => {
        setRefreshing(false);
      });
  };

  // Fetch data when the busStopCode changes
  useEffect(() => {
    if (busStopCode) {
      fetchBusData(busStopCode);
    }
  }, [busStopCode]);

  

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const handleRefresh = async () => {
    if (busStopCode) {
      fetchBusData(busStopCode); // Re-fetch the data for the current bus stop
      onRefresh?.(); // Notify the parent component if needed
    }
  };

  const snapPoints = useMemo(() => ["45%"], []);

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

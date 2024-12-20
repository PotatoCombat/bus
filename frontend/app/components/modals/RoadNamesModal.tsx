import {
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { Colors, Outlines, Typography } from "@/app/styles";

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.neutral.white,
    margin: 25,
    padding: 20,
    borderRadius: Outlines.borderRadius.small,
  },
  roadNameContainer: {
    backgroundColor: Colors.neutral.s100,
    borderWidth: Outlines.borderWidth.thin,
    margin: 5,
    padding: 5,
  },
  roadName: {
    fontSize: Typography.fontSize.x50,
  },
  button: {
    backgroundColor: Colors.neutral.s200,
    borderWidth: Outlines.borderWidth.base,
    margin: 5,
    padding: 5,
  },
  buttonText: {
    fontSize: Typography.fontSize.x30,
    textAlign: "center",
  },
});

export default function RoadNamesModal({
  visible,
  closeModal,
  originRoadName,
  destinationRoadName,
}: {
  visible: boolean;
  closeModal: Function;
  originRoadName: string | undefined;
  destinationRoadName: string | undefined;
}) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => closeModal()}
    >
      <View style={styles.modalContainer}>
        <View style={styles.container}>
          <View style={styles.roadNameContainer}>
            <Text style={styles.roadName}>{originRoadName}</Text>
          </View>

          <View style={styles.roadNameContainer}>
            <Text style={styles.roadName}>{destinationRoadName}</Text>
          </View>

          <TouchableHighlight
            onPress={() => closeModal()}
            activeOpacity={0.6}
            underlayColor={Colors.neutral.s100}
            style={styles.button}
          >
            <Text style={styles.buttonText}>CLOSE</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
  );
}

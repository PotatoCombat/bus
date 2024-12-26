import { useState } from "react";
import { StyleProp, TouchableHighlight, View, ViewStyle } from "react-native";
import { Icon, SearchBar } from "@rneui/themed";
import styles from "./styles";
import SearchResultInterface from "@/app/types/SearchResultInterface";
import searchApi from "@/app/services/SearchApi";
import SearchResults from "./SearchResults";
import { searchBarPlaceholderText } from "@/app/utils/strings";
import SearchResultDisplay from "./SearchResultDisplay";
import { Colors, Sizing } from "@/app/styles";
import RoadNamesModal from "../modals/RoadNamesModal";

export default function Search({ style }: { style: StyleProp<ViewStyle> }) {
  const [value, setValue] = useState("");
  const [selectedResult, setSelectedResult] =
    useState<SearchResultInterface | null>(null);
  const [results, setResults] = useState<SearchResultInterface[] | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const changeText = async (text: string) => {
    setValue(text);

    if (text.length == 0) {
      setResults(null);
    } else {
      searchApi(text)
        .then((value) => setResults(value))
        .catch((err) => console.log(err));
    }
  };

  const handleClickSearchButton = () => {
    setSelectedResult(null);
  };

  return (
    <>
      <View style={style}>
        {selectedResult == null ? (
          <>
            <SearchBar
              containerStyle={styles.searchBarContainer}
              inputContainerStyle={
                results != null
                  ? styles.searchedInputContainer
                  : styles.inputContainer
              }
              inputStyle={styles.input}
              placeholder={searchBarPlaceholderText}
              onChangeText={changeText}
              value={value}
              clearIcon={{
                color: Colors.neutral.black,
                size: Sizing.icons.x25,
              }}
              rightIconContainerStyle={styles.rightIconContainer}
              lightTheme={true}
            />

            <SearchResults
              results={results}
              setSelectedResult={setSelectedResult}
            />
          </>
        ) : (
          <>
            <View style={styles.rowContainer}>
              <SearchResultDisplay
                selectedResult={selectedResult}
                setSelectedResult={setSelectedResult}
                openModal={() => setModalVisible(true)}
                isSwitchableRoute={results != null && results.length > 1}
              />

              <TouchableHighlight
                onPress={handleClickSearchButton}
                style={styles.buttonIconContainer}
                activeOpacity={0.6}
                underlayColor={Colors.neutral.s100}
              >
                <View>
                  <Icon name="search" />
                </View>
              </TouchableHighlight>
            </View>
          </>
        )}
      </View>

      {modalVisible && <View style={styles.modalBackground} />}

      <RoadNamesModal
        visible={modalVisible}
        closeModal={() => setModalVisible(false)}
        originRoadName={selectedResult?.originRoadName}
        destinationRoadName={selectedResult?.destinationRoadName}
      />
    </>
  );
}

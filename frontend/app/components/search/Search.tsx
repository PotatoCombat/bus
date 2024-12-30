import busRouteApi from "@/app/services/BusRouteApi";
import searchApi from "@/app/services/SearchApi";
import { Colors, Sizing } from "@/app/styles";
import BusRouteInterface from "@/app/types/BusRouteInterface";
import SearchResultInterface from "@/app/types/SearchResultInterface";
import { searchBarPlaceholderText } from "@/app/utils/strings";
import { Icon, SearchBar } from "@rneui/themed";
import { useState } from "react";
import { StyleProp, TouchableHighlight, View, ViewStyle } from "react-native";
import RoadNamesModal from "../modals/RoadNamesModal";
import SearchResultDisplay from "./SearchResultDisplay";
import SearchResults from "./SearchResults";
import styles from "./styles";

export default function Search(
  {
    style,
    onSelectedResult,
    onClearedResult,
  }: {
    style: StyleProp<ViewStyle>,
    onSelectedResult?: (result: BusRouteInterface) => void
    onClearedResult?: () => void
  }
) {
  const [value, setValue] = useState('');
  const [results, setResults] = useState<SearchResultInterface[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>(undefined);
  const [modalVisible, setModalVisible] = useState(false);

  const changeText = async (text: string) => {
    setValue(text);

    if (text.length == 0) {
      setResults([]);
    } else {
      searchApi(text)
        .then(setResults)
        .catch(console.error);
    }
  };

  const handleClickSearchButton = () => {
    setSelectedIndex(undefined);
    onClearedResult?.();
  };

  const handleSelectedResult = function (index: number) {
    setSelectedIndex(index);
    busRouteApi(value)
      .then(response => response.Routes[index])
      .then(result => onSelectedResult?.(result));
  }

  const handleSwitchRoute = () => {
    if (selectedIndex === undefined) {
      return;
    }
    const nextIndex = selectedIndex === 0 ? 1 : 0;
    setSelectedIndex(nextIndex);
    busRouteApi(value)
      .then(response => response.Routes[nextIndex])
      .then(result => onSelectedResult?.(result));
  };

  return (
    <>
      <View style={style}>
        {selectedIndex === undefined ? (
          <>
            <SearchBar
              containerStyle={styles.searchBarContainer}
              inputContainerStyle={
                value.length > 0
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
              results={value.length > 0 ? results : null}
              onSelectResult={handleSelectedResult}
            />
          </>
        ) : (
          <>
            <View style={styles.rowContainer}>
              <SearchResultDisplay
                result={results[selectedIndex]}
                isSwitchableRoute={results.length > 1}
                onPress={() => setModalVisible(true)}
                onSwitchRoute={handleSwitchRoute}
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
        originRoadName={selectedIndex !== undefined ? results[selectedIndex].originRoadName : ''}
        destinationRoadName={selectedIndex !== undefined ? results[selectedIndex].destinationRoadName : ''}
      />
    </>
  );
}
